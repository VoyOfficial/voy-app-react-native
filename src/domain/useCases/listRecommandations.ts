import { RecommendationModel } from '../models';

export default interface ListRecommendations {
  list(): Promise<RecommendationModel[]>;
}
