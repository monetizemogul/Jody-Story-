export function getCityUrl(cityId: string): string {
  if (cityId === 'bonne-terre') {
    return '/bonne-terre-mo-bail-bonds--24/7-jail-release-services';
  }
  if (cityId === 'ironton') {
    return '/ironton-bail-bonds-247-jail-release';
  }
  return `/service-area/city/${cityId}`;
}
