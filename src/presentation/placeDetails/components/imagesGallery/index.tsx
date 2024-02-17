import React from 'react';
import { ImageGallery } from '@georstat/react-native-image-gallery';

type Props = {
  images: Array<{ id: number; url: string }>;
  isOpen: boolean;
  close: () => void;
};

const ImagesGallery = ({ images, isOpen, close }: Props) => {
  return (
    <ImageGallery
      close={close}
      isOpen={isOpen}
      images={images}
      thumbColor="#FFAB5E"
    />
  );
};

export default ImagesGallery;
