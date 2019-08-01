import { normalize } from '../utilities/responsive-fonts';

const Fonts = {
  extraLarge: {
    fontFamily: 'OpenSans-Regular',
    fontSize: normalize(16),
  },
  extraLargeBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: normalize(16),
  },
  header: {
    fontFamily: 'OpenSans-Regular',
    fontSize: normalize(18),
  },
  headerBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: normalize(18),
  },
  large: {
    fontFamily: 'OpenSans-Regular',
    fontSize: normalize(14),
  },
  largeBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: normalize(14),
  },
  regular: {
    fontFamily: 'OpenSans-Regular',
    fontSize: normalize(12),
  },
  regularBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: normalize(12),
  },
};

module.exports = Fonts;
