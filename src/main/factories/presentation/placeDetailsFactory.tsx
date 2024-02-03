import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { faker } from '@faker-js/faker';
import { Actions, Routes, navigator } from '~/main/navigation';
import {
  PlaceDetails,
  usePlaceDetails,
} from '../../../../src/presentation/placeDetails';
import { StackParams } from '../../navigation/navigation';

type Props = {
  route: RouteProp<StackParams, Routes>;
  navigation: any;
};

const PlaceDetailsFactory = ({}: Props) => {
  const viewModel = usePlaceDetails({
    navigate: new Actions(navigator).navigate,
    gallerySummaryImages: [
      faker.image.nature(),
      faker.image.nature(),
      faker.image.nature(),
      faker.image.nature(),
      faker.image.nature(),
      faker.image.nature(),
      faker.image.nature(),
    ],
  });

  return (
    <PlaceDetails
      title={'Lago Negro'}
      description={
        'Um dos passeios preferidos ao ar livre em Gramado e que pode ser feito em qualquer época do ano, é a visita ao Lago Negro. Trata-se de um espaço verde que possui uma natureza exuberante, onde os visitantes podem curtir atividades ao ar livre e andar de pedalinho em meio ao lago escuro.'
      }
      location={'Gramado - RS'}
      myDistanceOfLocal={'798'}
      amountOfReviews={'14.003 avaliações'}
      rating={'4.9/5'}
      businessHoursSummary={'Diariamente - Acesso livre (24 horas)'}
      fullLocation={'R. A. J. Renner - Bairro  Lago Negro'}
      contact={'(54) 3295-2195'}
      photoOfReviewProfiles={[
        faker.image.avatar(),
        faker.image.avatar(),
        faker.image.avatar(),
      ]}
      backgroundImage={viewModel.backgroundImage}
      gallerySummaryImages={viewModel.gallerySummaryImages}
      pressSummaryImageFromGallery={viewModel.pressSummaryImageFromGallery}
    />
  );
};

export default PlaceDetailsFactory;
