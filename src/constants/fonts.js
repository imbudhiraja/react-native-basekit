import { moderateScale } from '../utilities/responsive-fonts';

const Fonts = {
  extraLarge: {
    fontFamily: 'OpenSans-Regular',
    fontSize: moderateScale(18),
  },
  extraLargeBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: moderateScale(18),
  },
  header: {
    fontFamily: 'OpenSans-Regular',
    fontSize: moderateScale(20),
  },
  headerBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: moderateScale(20),
  },
  large: {
    fontFamily: 'OpenSans-Regular',
    fontSize: moderateScale(16),
  },
  largeBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: moderateScale(16),
  },
  regular: {
    fontFamily: 'OpenSans-Regular',
    fontSize: moderateScale(14),
  },
  regularBold: {
    fontFamily: 'OpenSans-Bold',
    fontSize: moderateScale(14),
  },
};

module.exports = Fonts;
