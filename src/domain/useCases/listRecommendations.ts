import { RecommendationModel } from '../models';
import { Location } from '../params';

export default interface ListRecommendations {
  list(location: Location): Promise<RecommendationModel[]>;
}
