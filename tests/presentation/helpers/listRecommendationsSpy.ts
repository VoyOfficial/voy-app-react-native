import { ListRecommendations } from '~/domain/useCases';
import { RecommendationModel } from '~/domain/models';
import { recommendationModelFactory } from './recommendationModelFactory';

export class ListRecommendationsSpy implements ListRecommendations {
  listCalled = 0;
  timeout = 0;

  constructor(
    readonly recommendations: Array<RecommendationModel> = [
      recommendationModelFactory(),
    ],
  ) {}

  async list(): Promise<RecommendationModel[]> {
    let recommendations: Array<RecommendationModel> = [];
    const complete = () => {
      this.listCalled += 1;
      recommendations = this.recommendations;
    };

    if (this.timeout > 0) {
      setTimeout(() => {
        complete();
      }, this.timeout);
    } else {
      complete();
    }

    return recommendations;
  }

  addTimeout(timeout: number): void {
    this.timeout = timeout;
  }
}
