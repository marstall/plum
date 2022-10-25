import _ from 'lodash';
import { helper } from '@ember/component/helper';
import ReleaseModel from '../models/release';

function processRelease([release]) {
  if (!release) return {};
  // if (typeof release !== Object) {
  //   release = release.toJSON();
  // }
  const releaseEvent = _.get(release, 'release-events[0]', { area: {} });
  let date = releaseEvent.date;
  const country = _.get(releaseEvent, 'area.name', 'n/a');
  const primaryType = _.get(release, 'release-group', {})['primary-type'];
  const labelName = _.get(release, 'label-info[0].label.name');
  //|| _.get(release, 'label-info[0]', { label: {} });
  const { format } = _.get(release, 'media[0]', {});
  console.log({ release: release.title });
  return {
    ...release,
    date,
    country,
    primaryType,
    labelName,
    format,
  };
}

export default helper(processRelease);

/*
{
      "id": "5e50d9a1-2941-443d-8d62-e23384355de0",
      "score": 100,
      "status-id": "4e304316-386d-3409-af2e-78857eec5cfe",
      "count": 1,
      "title": "Another Green World",
      "status": "Official",
      "text-representation": {
        "language": "eng",
        "script": "Latn"
      },
      "artist-credit": [
        {
          "name": "Eno",
          "artist": {
            "id": "ff95eb47-41c4-4f7f-a104-cdc30f02e872",
            "name": "Brian Eno",
            "sort-name": "Eno, Brian"
          }
        }
      ],
      "release-group": {
        "id": "7d5a684e-73a3-325c-a59c-34c9a941d8d6",
        "type-id": "f529b476-6e62-324f-b0aa-1f3e33d313fc",
        "primary-type-id": "f529b476-6e62-324f-b0aa-1f3e33d313fc",
        "title": "Another Green World",
        "primary-type": "Album"
      },
      "date": "1975",
      "country": "GB",
      "release-events": [
        {
          "date": "1975",
          "area": {
            "id": "8a754a16-0027-3a29-b6d7-2b40ea0481ed",
            "name": "United Kingdom",
            "sort-name": "United Kingdom",
            "iso-3166-1-codes": [
              "GB"
            ]
          }
        }
      ],
      "label-info": [
        {
          "catalog-number": "ILPS 9351",
          "label": {
            "id": "dfd92cd3-4888-46d2-b968-328b1feb2642",
            "name": "Island"
          }
        }
      ],
      "track-count": 14,
      "media": [
        {
          "format": "12\" Vinyl",
          "disc-count": 0,
          "track-count": 14
        }
      ]
    }
 */
