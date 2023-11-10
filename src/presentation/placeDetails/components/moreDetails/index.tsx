import React from 'react';
import {
  BusinessHourIconWrapper,
  BusinessHours,
  BusinessHoursSummaryContainer,
  ClockOutlineIcon,
  FullLocation,
  FullLocationContainer,
  FullLocationIconWrapper,
  LocationOutlineIcon,
  Phone,
  PhoneContainer,
  PhoneIconWrapper,
  PhoneOutlineIcon,
} from './styles';

const MoreDetails = ({
  businessHoursSummary,
  fullLocation,
  contact,
}: {
  businessHoursSummary: string;
  fullLocation: string;
  contact: string;
}) => (
  <>
    <BusinessHoursSummaryContainer>
      <BusinessHourIconWrapper>
        <ClockOutlineIcon testID="clock_icon_id" />
      </BusinessHourIconWrapper>
      <BusinessHours testID="business_hours_summary_id">
        {businessHoursSummary}
      </BusinessHours>
    </BusinessHoursSummaryContainer>
    <FullLocationContainer>
      <FullLocationIconWrapper>
        <LocationOutlineIcon testID="full_location_icon_id" />
      </FullLocationIconWrapper>
      <FullLocation testID="full_location_id">{fullLocation}</FullLocation>
    </FullLocationContainer>
    <PhoneContainer>
      <PhoneIconWrapper>
        <PhoneOutlineIcon testID="phone_icon_id" />
      </PhoneIconWrapper>
      <Phone testID="contact_id">{contact}</Phone>
    </PhoneContainer>
  </>
);

export default MoreDetails;
