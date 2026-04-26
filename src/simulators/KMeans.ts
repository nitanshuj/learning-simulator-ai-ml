export interface KMeansPoint {
  x: number
  y: number
  cluster: number  // -1 = unassigned
}

export interface KMeansCentroid {
  x: number
  y: number
  cluster: number
}

export interface KMeansState {
  points: KMeansPoint[]
  centroids: KMeansCentroid[]
  iteration: number
  inertia: number
  converged: boolean
  phase: 'assign' | 'update' | 'done'
}

export type KMeansDataset = 'blobs' | 'moons' | 'rings' | 'random'

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function generateKMeansData(dataset: KMeansDataset, n = 150): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = []

  if (dataset === 'blobs') {
    const centers = [[-3, -3], [0, 3], [3, -3], [-3, 3], [3, 3]]
    for (let i = 0; i < n; i++) {
      const c = centers[i % centers.length]
      points.push({ x: c[0] + randomRange(-1.5, 1.5), y: c[1] + randomRange(-1.5, 1.5) })
    }
  } else if (dataset === 'moons') {
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI
      if (i % 2 === 0) {
        points.push({ x: Math.cos(t) * 4 + randomRange(-0.4, 0.4), y: Math.sin(t) * 4 + randomRange(-0.4, 0.4) })
      } else {
        points.push({ x: Math.cos(t + Math.PI) * 4 + 2 + randomRange(-0.4, 0.4), y: Math.sin(t + Math.PI) * 4 + 1 + randomRange(-0.4, 0.4) })
      }
    }
  } else if (dataset === 'rings') {
    for (let i = 0; i < n; i++) {
      const t = Math.random() * 2 * Math.PI
      const r = i % 2 === 0 ? randomRange(1.5, 2.5) : randomRange(4, 5)
      points.push({ x: Math.cos(t) * r, y: Math.sin(t) * r })
    }
  } else {
    for (let i = 0; i < n; i++) {
      points.push({ x: randomRange(-5, 5), y: randomRange(-5, 5) })
    }
  }
  return points
}

export class KMeans {
  private state: KMeansState

  constructor(rawPoints: { x: number; y: number }[], k: number) {
    // Initialize points with no cluster
    const points: KMeansPoint[] = rawPoints.map(p => ({ ...p, cluster: -1 }))

    // KMeans++ initialization — pick centroids spread out
    const centroids: KMeansCentroid[] = []
    const firstIdx = Math.floor(Math.random() * points.length)
    centroids.push({ x: points[firstIdx].x, y: points[firstIdx].y, cluster: 0 })

    for (let c = 1; c < k; c++) {
      // Weight by distance squared to nearest centroid
      const dists = points.map(p => {
        const minD = Math.min(...centroids.map(cent => (p.x - cent.x) ** 2 + (p.y - cent.y) ** 2))
        return minD
      })
      const total = dists.reduce((a, b) => a + b, 0)
      let r = Math.random() * total
      let idx = 0
      for (let i = 0; i < dists.length; i++) {
        r -= dists[i]
        if (r <= 0) { idx = i; break }
      }
      centroids.push({ x: points[idx].x, y: points[idx].y, cluster: c })
    }

    this.state = {
      points,
      centroids,
      iteration: 0,
      inertia: Infinity,
      converged: false,
      phase: 'assign',
    }
  }

  getState(): KMeansState {
    return {
      points: this.state.points.map(p => ({ ...p })),
      centroids: this.state.centroids.map(c => ({ ...c })),
      iteration: this.state.iteration,
      inertia: this.state.inertia,
      converged: this.state.converged,
      phase: this.state.phase,
    }
  }

  private assignClusters(): boolean {
    let changed = false
    for (const p of this.state.points) {
      let minDist = Infinity
      let best = 0
      for (const c of this.state.centroids) {
        const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2
        if (d < minDist) { minDist = d; best = c.cluster }
      }
      if (p.cluster !== best) { p.cluster = best; changed = true }
    }
    return changed
  }

  private updateCentroids() {
    for (const c of this.state.centroids) {
      const members = this.state.points.filter(p => p.cluster === c.cluster)
      if (members.length > 0) {
        c.x = members.reduce((s, p) => s + p.x, 0) / members.length
        c.y = members.reduce((s, p) => s + p.y, 0) / members.length
      }
    }
    // Calculate inertia
    this.state.inertia = this.state.points.reduce((sum, p) => {
      const c = this.state.centroids[p.cluster]
      if (!c) return sum
      return sum + (p.x - c.x) ** 2 + (p.y - c.y) ** 2
    }, 0)
  }

  step(): KMeansState {
    if (this.state.converged) return this.getState()

    if (this.state.phase === 'assign') {
      const changed = this.assignClusters()
      this.state.phase = 'update'
      if (!changed) {
        this.state.converged = true
        this.state.phase = 'done'
      }
    } else if (this.state.phase === 'update') {
      this.updateCentroids()
      this.state.iteration++
      this.state.phase = 'assign'
    }

    return this.getState()
  }

  runToConvergence(maxIter = 100): KMeansState {
    for (let i = 0; i < maxIter * 2 && !this.state.converged; i++) {
      this.step()
    }
    return this.getState()
  }

  reset(rawPoints: { x: number; y: number }[], k: number) {
    const sim = new KMeans(rawPoints, k)
    this.state = sim.state
  }
}
