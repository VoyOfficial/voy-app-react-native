import styled from 'styled-components/native';
import Icon from '../../../assets/fonts/Voy';

const Text = styled.Text`
  font-family: 'LexendDeca-Regular';
`;

export const BusinessHoursSummaryContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const BusinessHourIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const BusinessHours = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

export const FullLocationContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const FullLocationIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const FullLocation = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

export const PhoneContainer = styled.View`
  margin-top: 18px;
  flex-direction: row;
  align-items: center;
`;

export const PhoneIconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #f1f5f6;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 7px;
`;

export const Phone = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  line-height: 16.25px;
`;

type Props = {
  name?: string;
};

export const ClockOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'clock_outline',
  size: 16,
})<Props>``;

export const LocationOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'location_outline',
  size: 16,
})<Props>``;

export const PhoneOutlineIcon = styled(Icon).attrs({
  color: '#000000',
  name: 'phone_outline',
  size: 16,
})<Props>``;
