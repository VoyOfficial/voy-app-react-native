import RoadmapModel from '../models/roadmapModel';

export default interface ListRoadmap {
  list(): Promise<Array<RoadmapModel>>;
}
