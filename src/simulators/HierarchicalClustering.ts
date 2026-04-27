import { generateKMeansData } from './KMeans'

export type LinkageMethod = 'single' | 'complete' | 'average'

export interface ClusterNode {
  id: number
  index?: number // For leaf nodes
  children?: [ClusterNode, ClusterNode]
  height: number
  points: number[] // Indices of points in this cluster
  x?: number // For dendrogram layout
  y?: number // For dendrogram layout
}

export interface HierarchicalState {
  points: { x: number, y: number }[]
  clusters: number[] // Cluster assignment for each point given the current threshold
  mergeHistory: ClusterNode[]
  root: ClusterNode | null
  numClusters: number
  linkage: LinkageMethod
  threshold: number
  maxDistance: number
  silhouetteScore: number | null
}

export class HierarchicalClustering {
  private state: HierarchicalState

  constructor(dataset: string = 'blobs', linkage: LinkageMethod = 'average') {
    const rawPoints = generateKMeansData(dataset as any, 50) // Fewer points for better dendrogram
    this.state = {
      points: rawPoints,
      clusters: new Array(rawPoints.length).fill(0).map((_, i) => i),
      mergeHistory: [],
      root: null,
      numClusters: rawPoints.length,
      linkage,
      threshold: 5,
      maxDistance: 0,
      silhouetteScore: null
    }
    this.run()
  }

  private calculateDistance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
  }

  private getLinkageDistance(c1Points: number[], c2Points: number[]): number {
    const { points, linkage } = this.state
    let dist = linkage === 'single' ? Infinity : (linkage === 'complete' ? -Infinity : 0)
    let count = 0

    for (const i of c1Points) {
      for (const j of c2Points) {
        const d = this.calculateDistance(points[i], points[j])
        if (linkage === 'single') dist = Math.min(dist, d)
        else if (linkage === 'complete') dist = Math.max(dist, d)
        else {
          dist += d
          count++
        }
      }
    }

    return linkage === 'average' ? dist / count : dist
  }

  public run() {
    const { points } = this.state
    const n = points.length
    let nodes: ClusterNode[] = points.map((_, i) => ({
      id: i,
      index: i,
      height: 0,
      points: [i]
    }))

    const history: ClusterNode[] = [...nodes]
    let nextId = n

    while (nodes.length > 1) {
      let minDist = Infinity
      let bestPair: [number, number] = [0, 0]

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = this.getLinkageDistance(nodes[i].points, nodes[j].points)
          if (d < minDist) {
            minDist = d
            bestPair = [i, j]
          }
        }
      }

      const [i, j] = bestPair
      const newNode: ClusterNode = {
        id: nextId++,
        children: [nodes[i], nodes[j]],
        height: minDist,
        points: [...nodes[i].points, ...nodes[j].points]
      }

      history.push(newNode)
      this.state.maxDistance = Math.max(this.state.maxDistance, minDist)

      // Update nodes list: remove merged, add new
      const remaining = nodes.filter((_, idx) => idx !== i && idx !== j)
      nodes = [...remaining, newNode]
    }

    this.state.root = nodes[0]
    this.state.mergeHistory = history
    this.assignClustersByThreshold()
  }

  public setThreshold(val: number) {
    this.state.threshold = val
    this.assignClustersByThreshold()
  }

  private assignClustersByThreshold() {
    const { root, threshold, points } = this.state
    if (!root) return

    const clusters: number[] = new Array(points.length).fill(-1)
    let clusterCount = 0

    const traverse = (node: ClusterNode) => {
      if (node.height <= threshold || !node.children) {
        // This node becomes a cluster
        node.points.forEach(pIdx => clusters[pIdx] = clusterCount)
        clusterCount++
      } else {
        traverse(node.children[0])
        traverse(node.children[1])
      }
    }

    traverse(root)
    this.state.clusters = clusters
    this.state.numClusters = clusterCount
    this.state.silhouetteScore = this.calculateSilhouette()
  }

  private calculateSilhouette(): number | null {
    const { points, clusters, numClusters } = this.state
    if (numClusters < 2 || numClusters === points.length) return null

    let totalS = 0
    let validPoints = 0

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i]
      const c1 = clusters[i]
      
      // Points in same cluster
      const sameIndices = clusters.reduce((acc, c, idx) => (c === c1 && idx !== i) ? [...acc, idx] : acc, [] as number[])
      if (sameIndices.length === 0) continue

      // a(i): average distance to points in same cluster
      const a_i = sameIndices.reduce((sum, idx) => sum + this.calculateDistance(p1, points[idx]), 0) / sameIndices.length

      // b(i): min average distance to points in any other cluster
      let min_b_i = Infinity
      const uniqueClusters = Array.from(new Set(clusters))
      
      for (const cID of uniqueClusters) {
        if (cID === c1) continue
        const otherIndices = clusters.reduce((acc, c, idx) => c === cID ? [...acc, idx] : acc, [] as number[])
        const avgDist = otherIndices.reduce((sum, idx) => sum + this.calculateDistance(p1, points[idx]), 0) / otherIndices.length
        if (avgDist < min_b_i) min_b_i = avgDist
      }

      const s_i = (min_b_i - a_i) / Math.max(a_i, min_b_i)
      totalS += s_i
      validPoints++
    }

    return validPoints > 0 ? totalS / validPoints : null
  }

  public getState(): HierarchicalState {
    return { ...this.state }
  }

  public setLinkage(method: LinkageMethod) {
    this.state.linkage = method
    this.run()
  }

  public changeDataset(dataset: string) {
    this.state.points = generateKMeansData(dataset as any, 50)
    this.run()
  }
}
