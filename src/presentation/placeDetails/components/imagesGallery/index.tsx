import React from 'react';
import { ImageGallery } from '@georstat/react-native-image-gallery';

type Props = {
  images: Array<{ id: number; url: string }>;
  isOpen: boolean;
};

const ImagesGallery = ({ images, isOpen }: Props) => {
  return <ImageGallery close={() => {}} isOpen={isOpen} images={images} />;
};

export default ImagesGallery;
