/* eslint-disable no-extend-native */

String.prototype.capitalizeFirstLetter = () => this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);

String.prototype.capitalizeEachLetter = () => this.toLowerCase()
  .split(' ')
  .map((word) => word.capitalizeFirstLetter())
  .join(' ');
