// AUTO-GENERATED COMPREHENSIVE GLOBAL GAZETTEER FOR FIREHARMONIZER
// Total validated global geographic entities: 447
// Covering sovereign countries, Indian states & cities, global metropolises, provinces, and fire regions.

export interface RegionInfo {
  id: string;
  name: string;
  category: "Country" | "State" | "Province" | "City" | "District" | "Region";
  adminRegion?: string;
  country: string;
  bounds: {
    west: number;
    south: number;
    east: number;
    north: number;
  };
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  aliases?: string[];
}

export const GLOBAL_GAZETTEER: RegionInfo[] = [
  {
    "id": "afghanistan",
    "name": "Afghanistan",
    "category": "Country",
    "country": "Afghanistan",
    "bounds": {
      "west": 60.5,
      "south": 29.4,
      "east": 74.9,
      "north": 38.5
    },
    "center": [
      33.9,
      67.7
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "albania",
    "name": "Albania",
    "category": "Country",
    "country": "Albania",
    "bounds": {
      "west": 19.3,
      "south": 39.6,
      "east": 21.1,
      "north": 42.7
    },
    "center": [
      41.1,
      20.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "algeria",
    "name": "Algeria",
    "category": "Country",
    "country": "Algeria",
    "bounds": {
      "west": -8.7,
      "south": 18.9,
      "east": 12.0,
      "north": 37.1
    },
    "center": [
      28.0,
      1.6
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "andorra",
    "name": "Andorra",
    "category": "Country",
    "country": "Andorra",
    "bounds": {
      "west": 1.4,
      "south": 42.4,
      "east": 1.8,
      "north": 42.7
    },
    "center": [
      42.5,
      1.5
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "angola",
    "name": "Angola",
    "category": "Country",
    "country": "Angola",
    "bounds": {
      "west": 11.7,
      "south": -18.0,
      "east": 24.1,
      "north": -4.4
    },
    "center": [
      -11.2,
      17.9
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "antigua-and-barbuda",
    "name": "Antigua and Barbuda",
    "category": "Country",
    "country": "Antigua and Barbuda",
    "bounds": {
      "west": -61.9,
      "south": 17.0,
      "east": -61.7,
      "north": 17.7
    },
    "center": [
      17.06,
      -61.8
    ],
    "zoom": 10,
    "aliases": [
      "Antigua"
    ]
  },
  {
    "id": "argentina",
    "name": "Argentina",
    "category": "Country",
    "country": "Argentina",
    "bounds": {
      "west": -73.6,
      "south": -55.2,
      "east": -53.6,
      "north": -21.8
    },
    "center": [
      -38.4,
      -63.6
    ],
    "zoom": 4,
    "aliases": []
  },
  {
    "id": "armenia",
    "name": "Armenia",
    "category": "Country",
    "country": "Armenia",
    "bounds": {
      "west": 43.4,
      "south": 38.8,
      "east": 46.6,
      "north": 41.3
    },
    "center": [
      40.1,
      45.0
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "australia",
    "name": "Australia",
    "category": "Country",
    "country": "Australia",
    "bounds": {
      "west": 112.0,
      "south": -44.0,
      "east": 154.0,
      "north": -10.0
    },
    "center": [
      -25.3,
      133.8
    ],
    "zoom": 4,
    "aliases": [
      "Oz",
      "Aussie"
    ]
  },
  {
    "id": "austria",
    "name": "Austria",
    "category": "Country",
    "country": "Austria",
    "bounds": {
      "west": 9.5,
      "south": 46.4,
      "east": 17.2,
      "north": 49.0
    },
    "center": [
      47.5,
      14.5
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "azerbaijan",
    "name": "Azerbaijan",
    "category": "Country",
    "country": "Azerbaijan",
    "bounds": {
      "west": 44.8,
      "south": 38.4,
      "east": 50.6,
      "north": 41.9
    },
    "center": [
      40.1,
      47.6
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "bahamas",
    "name": "Bahamas",
    "category": "Country",
    "country": "Bahamas",
    "bounds": {
      "west": -79.3,
      "south": 20.9,
      "east": -72.7,
      "north": 27.3
    },
    "center": [
      25.0,
      -77.4
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "bahrain",
    "name": "Bahrain",
    "category": "Country",
    "country": "Bahrain",
    "bounds": {
      "west": 50.3,
      "south": 25.8,
      "east": 50.8,
      "north": 26.3
    },
    "center": [
      26.0,
      50.5
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "bangladesh",
    "name": "Bangladesh",
    "category": "Country",
    "country": "Bangladesh",
    "bounds": {
      "west": 88.0,
      "south": 20.7,
      "east": 92.7,
      "north": 26.6
    },
    "center": [
      23.7,
      90.4
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "barbados",
    "name": "Barbados",
    "category": "Country",
    "country": "Barbados",
    "bounds": {
      "west": -59.7,
      "south": 13.0,
      "east": -59.4,
      "north": 13.4
    },
    "center": [
      13.2,
      -59.5
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "belarus",
    "name": "Belarus",
    "category": "Country",
    "country": "Belarus",
    "bounds": {
      "west": 23.2,
      "south": 51.3,
      "east": 32.8,
      "north": 56.2
    },
    "center": [
      53.7,
      27.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "belgium",
    "name": "Belgium",
    "category": "Country",
    "country": "Belgium",
    "bounds": {
      "west": 2.5,
      "south": 49.5,
      "east": 6.4,
      "north": 51.5
    },
    "center": [
      50.5,
      4.5
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "belize",
    "name": "Belize",
    "category": "Country",
    "country": "Belize",
    "bounds": {
      "west": -89.2,
      "south": 15.9,
      "east": -87.8,
      "north": 18.5
    },
    "center": [
      17.2,
      -88.5
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "benin",
    "name": "Benin",
    "category": "Country",
    "country": "Benin",
    "bounds": {
      "west": 0.8,
      "south": 6.2,
      "east": 3.8,
      "north": 12.4
    },
    "center": [
      9.3,
      2.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "bhutan",
    "name": "Bhutan",
    "category": "Country",
    "country": "Bhutan",
    "bounds": {
      "west": 88.7,
      "south": 26.7,
      "east": 92.1,
      "north": 28.3
    },
    "center": [
      27.5,
      90.4
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "bolivia",
    "name": "Bolivia",
    "category": "Country",
    "country": "Bolivia",
    "bounds": {
      "west": -69.6,
      "south": -22.9,
      "east": -57.5,
      "north": -9.7
    },
    "center": [
      -16.3,
      -63.6
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "bosnia-and-herzegovina",
    "name": "Bosnia and Herzegovina",
    "category": "Country",
    "country": "Bosnia and Herzegovina",
    "bounds": {
      "west": 15.7,
      "south": 42.6,
      "east": 19.6,
      "north": 45.3
    },
    "center": [
      43.9,
      17.7
    ],
    "zoom": 7,
    "aliases": [
      "Bosnia"
    ]
  },
  {
    "id": "botswana",
    "name": "Botswana",
    "category": "Country",
    "country": "Botswana",
    "bounds": {
      "west": 20.0,
      "south": -26.9,
      "east": 29.4,
      "north": -17.8
    },
    "center": [
      -22.3,
      24.7
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "brazil",
    "name": "Brazil",
    "category": "Country",
    "country": "Brazil",
    "bounds": {
      "west": -73.9,
      "south": -33.7,
      "east": -34.8,
      "north": 5.3
    },
    "center": [
      -14.2,
      -51.9
    ],
    "zoom": 4,
    "aliases": [
      "Brasil"
    ]
  },
  {
    "id": "brunei",
    "name": "Brunei",
    "category": "Country",
    "country": "Brunei",
    "bounds": {
      "west": 114.1,
      "south": 4.0,
      "east": 115.4,
      "north": 5.1
    },
    "center": [
      4.5,
      114.7
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "bulgaria",
    "name": "Bulgaria",
    "category": "Country",
    "country": "Bulgaria",
    "bounds": {
      "west": 22.4,
      "south": 41.2,
      "east": 28.6,
      "north": 44.2
    },
    "center": [
      42.7,
      25.5
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "burkina-faso",
    "name": "Burkina Faso",
    "category": "Country",
    "country": "Burkina Faso",
    "bounds": {
      "west": -5.5,
      "south": 9.4,
      "east": 2.4,
      "north": 15.1
    },
    "center": [
      12.2,
      -1.6
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "burundi",
    "name": "Burundi",
    "category": "Country",
    "country": "Burundi",
    "bounds": {
      "west": 29.0,
      "south": -4.5,
      "east": 30.8,
      "north": -2.3
    },
    "center": [
      -3.4,
      29.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "cabo-verde",
    "name": "Cabo Verde",
    "category": "Country",
    "country": "Cabo Verde",
    "bounds": {
      "west": -25.4,
      "south": 14.8,
      "east": -22.6,
      "north": 17.2
    },
    "center": [
      16.54,
      -23.04
    ],
    "zoom": 8,
    "aliases": [
      "Cape Verde"
    ]
  },
  {
    "id": "cambodia",
    "name": "Cambodia",
    "category": "Country",
    "country": "Cambodia",
    "bounds": {
      "west": 102.3,
      "south": 10.4,
      "east": 107.6,
      "north": 14.7
    },
    "center": [
      12.6,
      104.9
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "cameroon",
    "name": "Cameroon",
    "category": "Country",
    "country": "Cameroon",
    "bounds": {
      "west": 8.5,
      "south": 1.7,
      "east": 16.2,
      "north": 13.1
    },
    "center": [
      7.4,
      12.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "canada",
    "name": "Canada",
    "category": "Country",
    "country": "Canada",
    "bounds": {
      "west": -141.0,
      "south": 41.7,
      "east": -52.6,
      "north": 83.1
    },
    "center": [
      56.1,
      -106.3
    ],
    "zoom": 3,
    "aliases": []
  },
  {
    "id": "central-african-republic",
    "name": "Central African Republic",
    "category": "Country",
    "country": "Central African Republic",
    "bounds": {
      "west": 14.4,
      "south": 2.2,
      "east": 27.5,
      "north": 11.0
    },
    "center": [
      6.6,
      20.9
    ],
    "zoom": 6,
    "aliases": [
      "CAR"
    ]
  },
  {
    "id": "chad",
    "name": "Chad",
    "category": "Country",
    "country": "Chad",
    "bounds": {
      "west": 13.5,
      "south": 7.4,
      "east": 24.0,
      "north": 23.5
    },
    "center": [
      15.5,
      18.7
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "chile",
    "name": "Chile",
    "category": "Country",
    "country": "Chile",
    "bounds": {
      "west": -75.6,
      "south": -55.9,
      "east": -66.9,
      "north": -17.5
    },
    "center": [
      -35.7,
      -71.5
    ],
    "zoom": 4,
    "aliases": []
  },
  {
    "id": "china",
    "name": "China",
    "category": "Country",
    "country": "China",
    "bounds": {
      "west": 73.5,
      "south": 18.2,
      "east": 134.8,
      "north": 53.6
    },
    "center": [
      35.9,
      104.2
    ],
    "zoom": 4,
    "aliases": [
      "PRC"
    ]
  },
  {
    "id": "colombia",
    "name": "Colombia",
    "category": "Country",
    "country": "Colombia",
    "bounds": {
      "west": -79.0,
      "south": -4.2,
      "east": -66.9,
      "north": 12.5
    },
    "center": [
      4.6,
      -74.3
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "comoros",
    "name": "Comoros",
    "category": "Country",
    "country": "Comoros",
    "bounds": {
      "west": 43.2,
      "south": -12.4,
      "east": 44.6,
      "north": -11.3
    },
    "center": [
      -11.64,
      43.33
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "congo",
    "name": "Congo",
    "category": "Country",
    "country": "Congo",
    "bounds": {
      "west": 11.2,
      "south": -5.0,
      "east": 18.6,
      "north": 3.7
    },
    "center": [
      -0.2,
      15.8
    ],
    "zoom": 6,
    "aliases": [
      "Republic of the Congo"
    ]
  },
  {
    "id": "costa-rica",
    "name": "Costa Rica",
    "category": "Country",
    "country": "Costa Rica",
    "bounds": {
      "west": -85.9,
      "south": 8.0,
      "east": -82.6,
      "north": 11.2
    },
    "center": [
      9.7,
      -83.8
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "croatia",
    "name": "Croatia",
    "category": "Country",
    "country": "Croatia",
    "bounds": {
      "west": 13.5,
      "south": 42.4,
      "east": 19.4,
      "north": 46.6
    },
    "center": [
      45.1,
      15.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "cuba",
    "name": "Cuba",
    "category": "Country",
    "country": "Cuba",
    "bounds": {
      "west": -85.0,
      "south": 19.8,
      "east": -74.1,
      "north": 23.3
    },
    "center": [
      21.5,
      -77.8
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "cyprus",
    "name": "Cyprus",
    "category": "Country",
    "country": "Cyprus",
    "bounds": {
      "west": 32.3,
      "south": 34.6,
      "east": 34.6,
      "north": 35.7
    },
    "center": [
      35.1,
      33.4
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "czech-republic",
    "name": "Czech Republic",
    "category": "Country",
    "country": "Czech Republic",
    "bounds": {
      "west": 12.1,
      "south": 48.6,
      "east": 18.9,
      "north": 51.1
    },
    "center": [
      49.8,
      15.5
    ],
    "zoom": 7,
    "aliases": [
      "Czechia"
    ]
  },
  {
    "id": "democratic-republic-of-the-congo",
    "name": "Democratic Republic of the Congo",
    "category": "Country",
    "country": "Democratic Republic of the Congo",
    "bounds": {
      "west": 12.2,
      "south": -13.5,
      "east": 31.3,
      "north": 5.4
    },
    "center": [
      -4.0,
      21.8
    ],
    "zoom": 5,
    "aliases": [
      "DR Congo",
      "DRC",
      "Congo Kinshasa"
    ]
  },
  {
    "id": "denmark",
    "name": "Denmark",
    "category": "Country",
    "country": "Denmark",
    "bounds": {
      "west": 8.1,
      "south": 54.6,
      "east": 15.2,
      "north": 57.8
    },
    "center": [
      56.3,
      9.5
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "djibouti",
    "name": "Djibouti",
    "category": "Country",
    "country": "Djibouti",
    "bounds": {
      "west": 41.8,
      "south": 10.9,
      "east": 43.4,
      "north": 12.7
    },
    "center": [
      11.8,
      42.6
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "dominica",
    "name": "Dominica",
    "category": "Country",
    "country": "Dominica",
    "bounds": {
      "west": -61.5,
      "south": 15.2,
      "east": -61.2,
      "north": 15.7
    },
    "center": [
      15.41,
      -61.37
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "dominican-republic",
    "name": "Dominican Republic",
    "category": "Country",
    "country": "Dominican Republic",
    "bounds": {
      "west": -72.0,
      "south": 17.5,
      "east": -68.3,
      "north": 19.9
    },
    "center": [
      18.7,
      -70.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "ecuador",
    "name": "Ecuador",
    "category": "Country",
    "country": "Ecuador",
    "bounds": {
      "west": -81.1,
      "south": -5.0,
      "east": -75.2,
      "north": 1.4
    },
    "center": [
      -1.8,
      -78.2
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "egypt",
    "name": "Egypt",
    "category": "Country",
    "country": "Egypt",
    "bounds": {
      "west": 24.7,
      "south": 22.0,
      "east": 36.9,
      "north": 31.7
    },
    "center": [
      26.8,
      30.8
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "el-salvador",
    "name": "El Salvador",
    "category": "Country",
    "country": "El Salvador",
    "bounds": {
      "west": -90.1,
      "south": 13.2,
      "east": -87.7,
      "north": 14.4
    },
    "center": [
      13.8,
      -88.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "equatorial-guinea",
    "name": "Equatorial Guinea",
    "category": "Country",
    "country": "Equatorial Guinea",
    "bounds": {
      "west": 8.5,
      "south": 0.9,
      "east": 11.3,
      "north": 3.8
    },
    "center": [
      1.6,
      10.3
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "eritrea",
    "name": "Eritrea",
    "category": "Country",
    "country": "Eritrea",
    "bounds": {
      "west": 36.4,
      "south": 12.4,
      "east": 43.1,
      "north": 18.0
    },
    "center": [
      15.2,
      39.8
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "estonia",
    "name": "Estonia",
    "category": "Country",
    "country": "Estonia",
    "bounds": {
      "west": 21.8,
      "south": 57.5,
      "east": 28.2,
      "north": 59.7
    },
    "center": [
      58.6,
      25.0
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "eswatini",
    "name": "Eswatini",
    "category": "Country",
    "country": "Eswatini",
    "bounds": {
      "west": 30.8,
      "south": -27.3,
      "east": 32.1,
      "north": -25.7
    },
    "center": [
      -26.5,
      31.5
    ],
    "zoom": 9,
    "aliases": [
      "Swaziland"
    ]
  },
  {
    "id": "ethiopia",
    "name": "Ethiopia",
    "category": "Country",
    "country": "Ethiopia",
    "bounds": {
      "west": 33.0,
      "south": 3.4,
      "east": 48.0,
      "north": 14.9
    },
    "center": [
      9.1,
      40.5
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "fiji",
    "name": "Fiji",
    "category": "Country",
    "country": "Fiji",
    "bounds": {
      "west": 177.0,
      "south": -19.2,
      "east": 180.0,
      "north": -15.7
    },
    "center": [
      -17.7,
      178.1
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "finland",
    "name": "Finland",
    "category": "Country",
    "country": "Finland",
    "bounds": {
      "west": 20.6,
      "south": 59.8,
      "east": 31.6,
      "north": 70.1
    },
    "center": [
      61.9,
      25.7
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "france",
    "name": "France",
    "category": "Country",
    "country": "France",
    "bounds": {
      "west": -4.8,
      "south": 41.3,
      "east": 9.6,
      "north": 51.1
    },
    "center": [
      46.2,
      2.2
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "gabon",
    "name": "Gabon",
    "category": "Country",
    "country": "Gabon",
    "bounds": {
      "west": 8.7,
      "south": -4.0,
      "east": 14.5,
      "north": 2.3
    },
    "center": [
      -0.8,
      11.6
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "gambia",
    "name": "Gambia",
    "category": "Country",
    "country": "Gambia",
    "bounds": {
      "west": -16.8,
      "south": 13.1,
      "east": -13.8,
      "north": 13.8
    },
    "center": [
      13.4,
      -15.3
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "georgia",
    "name": "Georgia",
    "category": "Country",
    "country": "Georgia",
    "bounds": {
      "west": 40.0,
      "south": 41.1,
      "east": 46.7,
      "north": 43.6
    },
    "center": [
      42.3,
      43.4
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "germany",
    "name": "Germany",
    "category": "Country",
    "country": "Germany",
    "bounds": {
      "west": 5.9,
      "south": 47.3,
      "east": 15.0,
      "north": 55.1
    },
    "center": [
      51.2,
      10.4
    ],
    "zoom": 5,
    "aliases": [
      "Deutschland"
    ]
  },
  {
    "id": "ghana",
    "name": "Ghana",
    "category": "Country",
    "country": "Ghana",
    "bounds": {
      "west": -3.3,
      "south": 4.7,
      "east": 1.2,
      "north": 11.2
    },
    "center": [
      7.9,
      -1.0
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "greece",
    "name": "Greece",
    "category": "Country",
    "country": "Greece",
    "bounds": {
      "west": 19.3,
      "south": 34.8,
      "east": 29.6,
      "north": 41.8
    },
    "center": [
      39.1,
      21.8
    ],
    "zoom": 6,
    "aliases": [
      "Hellas"
    ]
  },
  {
    "id": "grenada",
    "name": "Grenada",
    "category": "Country",
    "country": "Grenada",
    "bounds": {
      "west": -61.8,
      "south": 11.9,
      "east": -61.5,
      "north": 12.3
    },
    "center": [
      12.12,
      -61.68
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "guatemala",
    "name": "Guatemala",
    "category": "Country",
    "country": "Guatemala",
    "bounds": {
      "west": -92.2,
      "south": 13.7,
      "east": -88.2,
      "north": 17.8
    },
    "center": [
      15.8,
      -90.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "guinea",
    "name": "Guinea",
    "category": "Country",
    "country": "Guinea",
    "bounds": {
      "west": -15.1,
      "south": 7.2,
      "east": -7.6,
      "north": 12.7
    },
    "center": [
      9.9,
      -9.7
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "guinea-bissau",
    "name": "Guinea-Bissau",
    "category": "Country",
    "country": "Guinea-Bissau",
    "bounds": {
      "west": -16.7,
      "south": 10.9,
      "east": -13.6,
      "north": 12.7
    },
    "center": [
      11.8,
      -15.18
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "guyana",
    "name": "Guyana",
    "category": "Country",
    "country": "Guyana",
    "bounds": {
      "west": -61.4,
      "south": 1.2,
      "east": -56.5,
      "north": 8.6
    },
    "center": [
      4.9,
      -58.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "haiti",
    "name": "Haiti",
    "category": "Country",
    "country": "Haiti",
    "bounds": {
      "west": -74.5,
      "south": 18.0,
      "east": -71.6,
      "north": 20.1
    },
    "center": [
      19.0,
      -72.3
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "honduras",
    "name": "Honduras",
    "category": "Country",
    "country": "Honduras",
    "bounds": {
      "west": -89.4,
      "south": 12.9,
      "east": -83.1,
      "north": 16.5
    },
    "center": [
      15.2,
      -86.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "hungary",
    "name": "Hungary",
    "category": "Country",
    "country": "Hungary",
    "bounds": {
      "west": 16.1,
      "south": 45.7,
      "east": 22.9,
      "north": 48.6
    },
    "center": [
      47.2,
      19.5
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "iceland",
    "name": "Iceland",
    "category": "Country",
    "country": "Iceland",
    "bounds": {
      "west": -24.5,
      "south": 63.3,
      "east": -13.5,
      "north": 66.5
    },
    "center": [
      64.9,
      -19.0
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "india",
    "name": "India",
    "category": "Country",
    "country": "India",
    "bounds": {
      "west": 68.0,
      "south": 6.5,
      "east": 97.5,
      "north": 37.0
    },
    "center": [
      22.5,
      82.0
    ],
    "zoom": 4,
    "aliases": [
      "Bharat",
      "Hindustan"
    ]
  },
  {
    "id": "indonesia",
    "name": "Indonesia",
    "category": "Country",
    "country": "Indonesia",
    "bounds": {
      "west": 95.0,
      "south": -11.0,
      "east": 141.0,
      "north": 6.0
    },
    "center": [
      -0.8,
      113.9
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "iran",
    "name": "Iran",
    "category": "Country",
    "country": "Iran",
    "bounds": {
      "west": 44.0,
      "south": 25.1,
      "east": 63.3,
      "north": 39.8
    },
    "center": [
      32.4,
      53.7
    ],
    "zoom": 5,
    "aliases": [
      "Persia"
    ]
  },
  {
    "id": "iraq",
    "name": "Iraq",
    "category": "Country",
    "country": "Iraq",
    "bounds": {
      "west": 38.8,
      "south": 29.1,
      "east": 48.6,
      "north": 37.4
    },
    "center": [
      33.2,
      43.7
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "ireland",
    "name": "Ireland",
    "category": "Country",
    "country": "Ireland",
    "bounds": {
      "west": -10.5,
      "south": 51.4,
      "east": -6.0,
      "north": 55.4
    },
    "center": [
      53.1,
      -7.7
    ],
    "zoom": 6,
    "aliases": [
      "Eire"
    ]
  },
  {
    "id": "israel",
    "name": "Israel",
    "category": "Country",
    "country": "Israel",
    "bounds": {
      "west": 34.3,
      "south": 29.5,
      "east": 35.9,
      "north": 33.3
    },
    "center": [
      31.0,
      34.9
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "italy",
    "name": "Italy",
    "category": "Country",
    "country": "Italy",
    "bounds": {
      "west": 6.6,
      "south": 36.6,
      "east": 18.5,
      "north": 47.1
    },
    "center": [
      41.9,
      12.6
    ],
    "zoom": 5,
    "aliases": [
      "Italia"
    ]
  },
  {
    "id": "ivory-coast",
    "name": "Ivory Coast",
    "category": "Country",
    "country": "Ivory Coast",
    "bounds": {
      "west": -8.6,
      "south": 4.4,
      "east": -2.5,
      "north": 10.7
    },
    "center": [
      7.5,
      -5.5
    ],
    "zoom": 6,
    "aliases": [
      "Cote d'Ivoire"
    ]
  },
  {
    "id": "jamaica",
    "name": "Jamaica",
    "category": "Country",
    "country": "Jamaica",
    "bounds": {
      "west": -78.4,
      "south": 17.7,
      "east": -76.2,
      "north": 18.5
    },
    "center": [
      18.1,
      -77.3
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "japan",
    "name": "Japan",
    "category": "Country",
    "country": "Japan",
    "bounds": {
      "west": 122.9,
      "south": 24.0,
      "east": 153.0,
      "north": 45.5
    },
    "center": [
      36.2,
      138.3
    ],
    "zoom": 5,
    "aliases": [
      "Nippon"
    ]
  },
  {
    "id": "jordan",
    "name": "Jordan",
    "category": "Country",
    "country": "Jordan",
    "bounds": {
      "west": 34.9,
      "south": 29.2,
      "east": 39.3,
      "north": 33.4
    },
    "center": [
      30.6,
      36.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "kazakhstan",
    "name": "Kazakhstan",
    "category": "Country",
    "country": "Kazakhstan",
    "bounds": {
      "west": 46.5,
      "south": 40.6,
      "east": 87.3,
      "north": 55.4
    },
    "center": [
      48.0,
      66.9
    ],
    "zoom": 4,
    "aliases": []
  },
  {
    "id": "kenya",
    "name": "Kenya",
    "category": "Country",
    "country": "Kenya",
    "bounds": {
      "west": 33.9,
      "south": -4.7,
      "east": 41.9,
      "north": 5.0
    },
    "center": [
      -0.02,
      37.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "kiribati",
    "name": "Kiribati",
    "category": "Country",
    "country": "Kiribati",
    "bounds": {
      "west": 172.0,
      "south": -3.5,
      "east": 177.0,
      "north": 3.5
    },
    "center": [
      1.45,
      173.0
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "kuwait",
    "name": "Kuwait",
    "category": "Country",
    "country": "Kuwait",
    "bounds": {
      "west": 46.5,
      "south": 28.5,
      "east": 48.4,
      "north": 30.1
    },
    "center": [
      29.3,
      47.5
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "kyrgyzstan",
    "name": "Kyrgyzstan",
    "category": "Country",
    "country": "Kyrgyzstan",
    "bounds": {
      "west": 69.3,
      "south": 39.2,
      "east": 80.3,
      "north": 43.3
    },
    "center": [
      41.2,
      74.8
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "laos",
    "name": "Laos",
    "category": "Country",
    "country": "Laos",
    "bounds": {
      "west": 100.1,
      "south": 13.9,
      "east": 107.6,
      "north": 22.5
    },
    "center": [
      19.9,
      102.5
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "latvia",
    "name": "Latvia",
    "category": "Country",
    "country": "Latvia",
    "bounds": {
      "west": 20.9,
      "south": 55.7,
      "east": 28.2,
      "north": 58.1
    },
    "center": [
      56.9,
      24.6
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "lebanon",
    "name": "Lebanon",
    "category": "Country",
    "country": "Lebanon",
    "bounds": {
      "west": 35.1,
      "south": 33.1,
      "east": 36.6,
      "north": 34.7
    },
    "center": [
      33.9,
      35.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "lesotho",
    "name": "Lesotho",
    "category": "Country",
    "country": "Lesotho",
    "bounds": {
      "west": 27.0,
      "south": -30.7,
      "east": 29.5,
      "north": -28.6
    },
    "center": [
      -29.6,
      28.2
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "liberia",
    "name": "Liberia",
    "category": "Country",
    "country": "Liberia",
    "bounds": {
      "west": -11.5,
      "south": 4.3,
      "east": -7.4,
      "north": 8.5
    },
    "center": [
      6.4,
      -9.4
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "libya",
    "name": "Libya",
    "category": "Country",
    "country": "Libya",
    "bounds": {
      "west": 9.4,
      "south": 19.5,
      "east": 25.2,
      "north": 33.2
    },
    "center": [
      26.3,
      17.2
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "liechtenstein",
    "name": "Liechtenstein",
    "category": "Country",
    "country": "Liechtenstein",
    "bounds": {
      "west": 9.47,
      "south": 47.05,
      "east": 9.64,
      "north": 47.27
    },
    "center": [
      47.17,
      9.55
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "lithuania",
    "name": "Lithuania",
    "category": "Country",
    "country": "Lithuania",
    "bounds": {
      "west": 20.9,
      "south": 53.9,
      "east": 26.8,
      "north": 56.4
    },
    "center": [
      55.2,
      23.9
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "luxembourg",
    "name": "Luxembourg",
    "category": "Country",
    "country": "Luxembourg",
    "bounds": {
      "west": 5.7,
      "south": 49.4,
      "east": 6.5,
      "north": 50.2
    },
    "center": [
      49.8,
      6.1
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "madagascar",
    "name": "Madagascar",
    "category": "Country",
    "country": "Madagascar",
    "bounds": {
      "west": 43.2,
      "south": -25.6,
      "east": 50.5,
      "north": -11.9
    },
    "center": [
      -18.8,
      46.9
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "malawi",
    "name": "Malawi",
    "category": "Country",
    "country": "Malawi",
    "bounds": {
      "west": 32.7,
      "south": -17.1,
      "east": 35.9,
      "north": -9.4
    },
    "center": [
      -13.3,
      34.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "malaysia",
    "name": "Malaysia",
    "category": "Country",
    "country": "Malaysia",
    "bounds": {
      "west": 99.6,
      "south": 0.9,
      "east": 119.3,
      "north": 7.4
    },
    "center": [
      4.2,
      101.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "maldives",
    "name": "Maldives",
    "category": "Country",
    "country": "Maldives",
    "bounds": {
      "west": 72.5,
      "south": -0.7,
      "east": 73.8,
      "north": 7.1
    },
    "center": [
      3.2,
      73.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "mali",
    "name": "Mali",
    "category": "Country",
    "country": "Mali",
    "bounds": {
      "west": -12.2,
      "south": 10.1,
      "east": 4.2,
      "north": 25.0
    },
    "center": [
      17.6,
      -4.0
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "malta",
    "name": "Malta",
    "category": "Country",
    "country": "Malta",
    "bounds": {
      "west": 14.1,
      "south": 35.8,
      "east": 14.6,
      "north": 36.1
    },
    "center": [
      35.9,
      14.4
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "marshall-islands",
    "name": "Marshall Islands",
    "category": "Country",
    "country": "Marshall Islands",
    "bounds": {
      "west": 168.0,
      "south": 4.5,
      "east": 172.5,
      "north": 12.0
    },
    "center": [
      7.13,
      171.18
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "mauritania",
    "name": "Mauritania",
    "category": "Country",
    "country": "Mauritania",
    "bounds": {
      "west": -17.1,
      "south": 14.7,
      "east": -4.8,
      "north": 27.3
    },
    "center": [
      21.0,
      -10.9
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "mauritius",
    "name": "Mauritius",
    "category": "Country",
    "country": "Mauritius",
    "bounds": {
      "west": 57.3,
      "south": -20.5,
      "east": 57.8,
      "north": -19.9
    },
    "center": [
      -20.3,
      57.6
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "mexico",
    "name": "Mexico",
    "category": "Country",
    "country": "Mexico",
    "bounds": {
      "west": -118.4,
      "south": 14.5,
      "east": -86.7,
      "north": 32.7
    },
    "center": [
      23.6,
      -102.5
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "micronesia",
    "name": "Micronesia",
    "category": "Country",
    "country": "Micronesia",
    "bounds": {
      "west": 138.0,
      "south": 5.0,
      "east": 163.0,
      "north": 10.0
    },
    "center": [
      7.42,
      150.55
    ],
    "zoom": 6,
    "aliases": [
      "FSM"
    ]
  },
  {
    "id": "moldova",
    "name": "Moldova",
    "category": "Country",
    "country": "Moldova",
    "bounds": {
      "west": 26.6,
      "south": 45.5,
      "east": 30.2,
      "north": 48.5
    },
    "center": [
      47.4,
      28.4
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "monaco",
    "name": "Monaco",
    "category": "Country",
    "country": "Monaco",
    "bounds": {
      "west": 7.4,
      "south": 43.72,
      "east": 7.45,
      "north": 43.76
    },
    "center": [
      43.73,
      7.42
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "mongolia",
    "name": "Mongolia",
    "category": "Country",
    "country": "Mongolia",
    "bounds": {
      "west": 87.7,
      "south": 41.6,
      "east": 119.9,
      "north": 52.1
    },
    "center": [
      46.9,
      103.8
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "montenegro",
    "name": "Montenegro",
    "category": "Country",
    "country": "Montenegro",
    "bounds": {
      "west": 18.4,
      "south": 41.8,
      "east": 20.3,
      "north": 43.6
    },
    "center": [
      42.7,
      19.4
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "morocco",
    "name": "Morocco",
    "category": "Country",
    "country": "Morocco",
    "bounds": {
      "west": -13.2,
      "south": 27.7,
      "east": -1.0,
      "north": 35.9
    },
    "center": [
      31.8,
      -7.1
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "mozambique",
    "name": "Mozambique",
    "category": "Country",
    "country": "Mozambique",
    "bounds": {
      "west": 30.2,
      "south": -26.9,
      "east": 40.8,
      "north": -10.5
    },
    "center": [
      -18.7,
      35.5
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "myanmar",
    "name": "Myanmar",
    "category": "Country",
    "country": "Myanmar",
    "bounds": {
      "west": 92.2,
      "south": 9.8,
      "east": 101.2,
      "north": 28.5
    },
    "center": [
      21.9,
      95.9
    ],
    "zoom": 5,
    "aliases": [
      "Burma"
    ]
  },
  {
    "id": "namibia",
    "name": "Namibia",
    "category": "Country",
    "country": "Namibia",
    "bounds": {
      "west": 11.7,
      "south": -29.0,
      "east": 25.3,
      "north": -16.9
    },
    "center": [
      -22.6,
      17.1
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "nauru",
    "name": "Nauru",
    "category": "Country",
    "country": "Nauru",
    "bounds": {
      "west": 166.9,
      "south": -0.55,
      "east": 166.96,
      "north": -0.5
    },
    "center": [
      -0.53,
      166.92
    ],
    "zoom": 13,
    "aliases": []
  },
  {
    "id": "nepal",
    "name": "Nepal",
    "category": "Country",
    "country": "Nepal",
    "bounds": {
      "west": 80.1,
      "south": 26.3,
      "east": 88.2,
      "north": 30.4
    },
    "center": [
      28.4,
      84.1
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "netherlands",
    "name": "Netherlands",
    "category": "Country",
    "country": "Netherlands",
    "bounds": {
      "west": 3.3,
      "south": 50.7,
      "east": 7.2,
      "north": 53.6
    },
    "center": [
      52.1,
      5.3
    ],
    "zoom": 7,
    "aliases": [
      "Holland"
    ]
  },
  {
    "id": "new-zealand",
    "name": "New Zealand",
    "category": "Country",
    "country": "New Zealand",
    "bounds": {
      "west": 166.4,
      "south": -47.3,
      "east": 178.6,
      "north": -34.4
    },
    "center": [
      -40.9,
      174.9
    ],
    "zoom": 5,
    "aliases": [
      "Aotearoa",
      "NZ"
    ]
  },
  {
    "id": "nicaragua",
    "name": "Nicaragua",
    "category": "Country",
    "country": "Nicaragua",
    "bounds": {
      "west": -87.7,
      "south": 10.7,
      "east": -83.1,
      "north": 15.0
    },
    "center": [
      12.9,
      -85.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "niger",
    "name": "Niger",
    "category": "Country",
    "country": "Niger",
    "bounds": {
      "west": 0.2,
      "south": 11.7,
      "east": 16.0,
      "north": 23.5
    },
    "center": [
      17.6,
      8.1
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "nigeria",
    "name": "Nigeria",
    "category": "Country",
    "country": "Nigeria",
    "bounds": {
      "west": 2.7,
      "south": 4.3,
      "east": 14.7,
      "north": 13.9
    },
    "center": [
      9.1,
      8.7
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "north-korea",
    "name": "North Korea",
    "category": "Country",
    "country": "North Korea",
    "bounds": {
      "west": 124.2,
      "south": 37.7,
      "east": 130.7,
      "north": 43.0
    },
    "center": [
      40.3,
      127.5
    ],
    "zoom": 6,
    "aliases": [
      "DPRK"
    ]
  },
  {
    "id": "north-macedonia",
    "name": "North Macedonia",
    "category": "Country",
    "country": "North Macedonia",
    "bounds": {
      "west": 20.4,
      "south": 40.8,
      "east": 23.0,
      "north": 42.4
    },
    "center": [
      41.6,
      21.7
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "norway",
    "name": "Norway",
    "category": "Country",
    "country": "Norway",
    "bounds": {
      "west": 4.6,
      "south": 57.9,
      "east": 31.1,
      "north": 71.2
    },
    "center": [
      60.5,
      8.5
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "oman",
    "name": "Oman",
    "category": "Country",
    "country": "Oman",
    "bounds": {
      "west": 52.0,
      "south": 16.6,
      "east": 59.8,
      "north": 26.4
    },
    "center": [
      21.5,
      55.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "pakistan",
    "name": "Pakistan",
    "category": "Country",
    "country": "Pakistan",
    "bounds": {
      "west": 60.9,
      "south": 23.7,
      "east": 77.1,
      "north": 37.1
    },
    "center": [
      30.4,
      69.3
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "palau",
    "name": "Palau",
    "category": "Country",
    "country": "Palau",
    "bounds": {
      "west": 134.2,
      "south": 6.8,
      "east": 134.7,
      "north": 8.2
    },
    "center": [
      7.51,
      134.58
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "palestine",
    "name": "Palestine",
    "category": "Country",
    "country": "Palestine",
    "bounds": {
      "west": 34.2,
      "south": 31.2,
      "east": 35.6,
      "north": 32.6
    },
    "center": [
      31.95,
      35.23
    ],
    "zoom": 8,
    "aliases": [
      "State of Palestine",
      "West Bank",
      "Gaza"
    ]
  },
  {
    "id": "panama",
    "name": "Panama",
    "category": "Country",
    "country": "Panama",
    "bounds": {
      "west": -83.0,
      "south": 7.2,
      "east": -77.2,
      "north": 9.6
    },
    "center": [
      8.5,
      -80.8
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "papua-new-guinea",
    "name": "Papua New Guinea",
    "category": "Country",
    "country": "Papua New Guinea",
    "bounds": {
      "west": 140.8,
      "south": -11.7,
      "east": 156.0,
      "north": -1.0
    },
    "center": [
      -6.3,
      143.9
    ],
    "zoom": 6,
    "aliases": [
      "PNG"
    ]
  },
  {
    "id": "paraguay",
    "name": "Paraguay",
    "category": "Country",
    "country": "Paraguay",
    "bounds": {
      "west": -62.6,
      "south": -27.6,
      "east": -54.2,
      "north": -19.3
    },
    "center": [
      -23.4,
      -58.4
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "peru",
    "name": "Peru",
    "category": "Country",
    "country": "Peru",
    "bounds": {
      "west": -81.3,
      "south": -18.4,
      "east": -68.7,
      "north": -0.03
    },
    "center": [
      -9.2,
      -75.0
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "philippines",
    "name": "Philippines",
    "category": "Country",
    "country": "Philippines",
    "bounds": {
      "west": 116.9,
      "south": 4.6,
      "east": 126.6,
      "north": 21.1
    },
    "center": [
      12.9,
      121.8
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "poland",
    "name": "Poland",
    "category": "Country",
    "country": "Poland",
    "bounds": {
      "west": 14.1,
      "south": 49.0,
      "east": 24.1,
      "north": 54.8
    },
    "center": [
      51.9,
      19.1
    ],
    "zoom": 6,
    "aliases": [
      "Polska"
    ]
  },
  {
    "id": "portugal",
    "name": "Portugal",
    "category": "Country",
    "country": "Portugal",
    "bounds": {
      "west": -9.5,
      "south": 36.9,
      "east": -6.2,
      "north": 42.2
    },
    "center": [
      39.4,
      -8.2
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "qatar",
    "name": "Qatar",
    "category": "Country",
    "country": "Qatar",
    "bounds": {
      "west": 50.7,
      "south": 24.5,
      "east": 51.6,
      "north": 26.2
    },
    "center": [
      25.4,
      51.2
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "romania",
    "name": "Romania",
    "category": "Country",
    "country": "Romania",
    "bounds": {
      "west": 20.3,
      "south": 43.6,
      "east": 29.7,
      "north": 48.3
    },
    "center": [
      45.9,
      24.9
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "russia",
    "name": "Russia",
    "category": "Country",
    "country": "Russia",
    "bounds": {
      "west": 19.6,
      "south": 41.2,
      "east": 179.9,
      "north": 81.9
    },
    "center": [
      61.5,
      105.3
    ],
    "zoom": 3,
    "aliases": [
      "Russian Federation",
      "RF"
    ]
  },
  {
    "id": "rwanda",
    "name": "Rwanda",
    "category": "Country",
    "country": "Rwanda",
    "bounds": {
      "west": 28.8,
      "south": -2.8,
      "east": 30.9,
      "north": -1.0
    },
    "center": [
      -1.9,
      29.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "saint-kitts-and-nevis",
    "name": "Saint Kitts and Nevis",
    "category": "Country",
    "country": "Saint Kitts and Nevis",
    "bounds": {
      "west": -62.9,
      "south": 17.1,
      "east": -62.5,
      "north": 17.4
    },
    "center": [
      17.36,
      -62.78
    ],
    "zoom": 11,
    "aliases": [
      "St Kitts"
    ]
  },
  {
    "id": "saint-lucia",
    "name": "Saint Lucia",
    "category": "Country",
    "country": "Saint Lucia",
    "bounds": {
      "west": -61.1,
      "south": 13.7,
      "east": -60.8,
      "north": 14.1
    },
    "center": [
      13.91,
      -60.98
    ],
    "zoom": 11,
    "aliases": [
      "St Lucia"
    ]
  },
  {
    "id": "saint-vincent-and-the-grenadines",
    "name": "Saint Vincent and the Grenadines",
    "category": "Country",
    "country": "Saint Vincent and the Grenadines",
    "bounds": {
      "west": -61.3,
      "south": 12.6,
      "east": -61.1,
      "north": 13.4
    },
    "center": [
      13.25,
      -61.2
    ],
    "zoom": 10,
    "aliases": [
      "St Vincent"
    ]
  },
  {
    "id": "samoa",
    "name": "Samoa",
    "category": "Country",
    "country": "Samoa",
    "bounds": {
      "west": -172.8,
      "south": -14.1,
      "east": -171.4,
      "north": -13.4
    },
    "center": [
      -13.76,
      -172.1
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "san-marino",
    "name": "San Marino",
    "category": "Country",
    "country": "San Marino",
    "bounds": {
      "west": 12.4,
      "south": 43.9,
      "east": 12.52,
      "north": 43.99
    },
    "center": [
      43.94,
      12.46
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "sao-tome-and-principe",
    "name": "Sao Tome and Principe",
    "category": "Country",
    "country": "Sao Tome and Principe",
    "bounds": {
      "west": 6.45,
      "south": 0.0,
      "east": 6.75,
      "north": 1.7
    },
    "center": [
      0.19,
      6.61
    ],
    "zoom": 9,
    "aliases": [
      "S\u00e3o Tom\u00e9"
    ]
  },
  {
    "id": "saudi-arabia",
    "name": "Saudi Arabia",
    "category": "Country",
    "country": "Saudi Arabia",
    "bounds": {
      "west": 34.5,
      "south": 16.4,
      "east": 55.7,
      "north": 32.2
    },
    "center": [
      23.9,
      45.1
    ],
    "zoom": 5,
    "aliases": [
      "KSA"
    ]
  },
  {
    "id": "senegal",
    "name": "Senegal",
    "category": "Country",
    "country": "Senegal",
    "bounds": {
      "west": -17.5,
      "south": 12.3,
      "east": -11.3,
      "north": 16.7
    },
    "center": [
      14.5,
      -14.5
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "serbia",
    "name": "Serbia",
    "category": "Country",
    "country": "Serbia",
    "bounds": {
      "west": 18.8,
      "south": 42.2,
      "east": 23.0,
      "north": 46.2
    },
    "center": [
      44.0,
      21.0
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "seychelles",
    "name": "Seychelles",
    "category": "Country",
    "country": "Seychelles",
    "bounds": {
      "west": 55.2,
      "south": -4.8,
      "east": 55.6,
      "north": -4.5
    },
    "center": [
      -4.68,
      55.49
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "sierra-leone",
    "name": "Sierra Leone",
    "category": "Country",
    "country": "Sierra Leone",
    "bounds": {
      "west": -13.3,
      "south": 6.9,
      "east": -10.3,
      "north": 10.0
    },
    "center": [
      8.5,
      -11.8
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "singapore",
    "name": "Singapore",
    "category": "Country",
    "country": "Singapore",
    "bounds": {
      "west": 103.6,
      "south": 1.2,
      "east": 104.0,
      "north": 1.5
    },
    "center": [
      1.35,
      103.8
    ],
    "zoom": 10,
    "aliases": [
      "Lion City"
    ]
  },
  {
    "id": "slovakia",
    "name": "Slovakia",
    "category": "Country",
    "country": "Slovakia",
    "bounds": {
      "west": 16.8,
      "south": 47.7,
      "east": 22.6,
      "north": 49.6
    },
    "center": [
      48.7,
      19.7
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "slovenia",
    "name": "Slovenia",
    "category": "Country",
    "country": "Slovenia",
    "bounds": {
      "west": 13.4,
      "south": 45.4,
      "east": 16.6,
      "north": 46.9
    },
    "center": [
      46.1,
      15.0
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "solomon-islands",
    "name": "Solomon Islands",
    "category": "Country",
    "country": "Solomon Islands",
    "bounds": {
      "west": 156.0,
      "south": -11.9,
      "east": 162.5,
      "north": -6.5
    },
    "center": [
      -9.65,
      160.16
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "somalia",
    "name": "Somalia",
    "category": "Country",
    "country": "Somalia",
    "bounds": {
      "west": 40.9,
      "south": -1.7,
      "east": 51.4,
      "north": 12.0
    },
    "center": [
      5.1,
      46.2
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "south-africa",
    "name": "South Africa",
    "category": "Country",
    "country": "South Africa",
    "bounds": {
      "west": 16.4,
      "south": -34.8,
      "east": 32.9,
      "north": -22.1
    },
    "center": [
      -30.5,
      22.9
    ],
    "zoom": 5,
    "aliases": [
      "RSA"
    ]
  },
  {
    "id": "south-korea",
    "name": "South Korea",
    "category": "Country",
    "country": "South Korea",
    "bounds": {
      "west": 126.1,
      "south": 33.1,
      "east": 129.6,
      "north": 38.6
    },
    "center": [
      35.9,
      127.8
    ],
    "zoom": 6,
    "aliases": [
      "Korea",
      "ROK"
    ]
  },
  {
    "id": "south-sudan",
    "name": "South Sudan",
    "category": "Country",
    "country": "South Sudan",
    "bounds": {
      "west": 24.1,
      "south": 3.5,
      "east": 35.9,
      "north": 12.2
    },
    "center": [
      6.9,
      31.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "spain",
    "name": "Spain",
    "category": "Country",
    "country": "Spain",
    "bounds": {
      "west": -9.3,
      "south": 36.0,
      "east": 3.3,
      "north": 43.8
    },
    "center": [
      40.5,
      -3.7
    ],
    "zoom": 6,
    "aliases": [
      "Espana"
    ]
  },
  {
    "id": "sri-lanka",
    "name": "Sri Lanka",
    "category": "Country",
    "country": "Sri Lanka",
    "bounds": {
      "west": 79.7,
      "south": 5.9,
      "east": 81.9,
      "north": 9.8
    },
    "center": [
      7.9,
      80.8
    ],
    "zoom": 7,
    "aliases": [
      "Ceylon"
    ]
  },
  {
    "id": "sudan",
    "name": "Sudan",
    "category": "Country",
    "country": "Sudan",
    "bounds": {
      "west": 21.8,
      "south": 9.3,
      "east": 38.6,
      "north": 22.2
    },
    "center": [
      12.9,
      30.2
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "suriname",
    "name": "Suriname",
    "category": "Country",
    "country": "Suriname",
    "bounds": {
      "west": -58.1,
      "south": 1.8,
      "east": -53.9,
      "north": 6.0
    },
    "center": [
      3.9,
      -56.0
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "sweden",
    "name": "Sweden",
    "category": "Country",
    "country": "Sweden",
    "bounds": {
      "west": 11.0,
      "south": 55.3,
      "east": 24.2,
      "north": 69.1
    },
    "center": [
      60.1,
      18.6
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "switzerland",
    "name": "Switzerland",
    "category": "Country",
    "country": "Switzerland",
    "bounds": {
      "west": 5.9,
      "south": 45.8,
      "east": 10.5,
      "north": 47.8
    },
    "center": [
      46.8,
      8.2
    ],
    "zoom": 7,
    "aliases": [
      "Swiss"
    ]
  },
  {
    "id": "syria",
    "name": "Syria",
    "category": "Country",
    "country": "Syria",
    "bounds": {
      "west": 35.6,
      "south": 32.3,
      "east": 42.4,
      "north": 37.3
    },
    "center": [
      34.8,
      39.0
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "taiwan",
    "name": "Taiwan",
    "category": "Country",
    "country": "Taiwan",
    "bounds": {
      "west": 120.0,
      "south": 21.9,
      "east": 122.0,
      "north": 25.3
    },
    "center": [
      23.7,
      121.0
    ],
    "zoom": 7,
    "aliases": [
      "ROC"
    ]
  },
  {
    "id": "tajikistan",
    "name": "Tajikistan",
    "category": "Country",
    "country": "Tajikistan",
    "bounds": {
      "west": 67.4,
      "south": 36.7,
      "east": 75.1,
      "north": 41.0
    },
    "center": [
      38.9,
      71.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "tanzania",
    "name": "Tanzania",
    "category": "Country",
    "country": "Tanzania",
    "bounds": {
      "west": 29.3,
      "south": -11.7,
      "east": 40.5,
      "north": -0.98
    },
    "center": [
      -6.4,
      34.9
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "thailand",
    "name": "Thailand",
    "category": "Country",
    "country": "Thailand",
    "bounds": {
      "west": 97.3,
      "south": 5.6,
      "east": 105.6,
      "north": 20.5
    },
    "center": [
      15.9,
      100.9
    ],
    "zoom": 5,
    "aliases": [
      "Siam"
    ]
  },
  {
    "id": "timor-leste",
    "name": "Timor-Leste",
    "category": "Country",
    "country": "Timor-Leste",
    "bounds": {
      "west": 124.0,
      "south": -9.5,
      "east": 127.4,
      "north": -8.1
    },
    "center": [
      -8.87,
      125.73
    ],
    "zoom": 8,
    "aliases": [
      "East Timor"
    ]
  },
  {
    "id": "togo",
    "name": "Togo",
    "category": "Country",
    "country": "Togo",
    "bounds": {
      "west": -0.1,
      "south": 6.1,
      "east": 1.8,
      "north": 11.1
    },
    "center": [
      8.6,
      0.8
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "tonga",
    "name": "Tonga",
    "category": "Country",
    "country": "Tonga",
    "bounds": {
      "west": -175.4,
      "south": -21.4,
      "east": -173.8,
      "north": -18.6
    },
    "center": [
      -21.18,
      -175.2
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "trinidad-and-tobago",
    "name": "Trinidad and Tobago",
    "category": "Country",
    "country": "Trinidad and Tobago",
    "bounds": {
      "west": -61.9,
      "south": 10.0,
      "east": -60.5,
      "north": 11.4
    },
    "center": [
      10.7,
      -61.2
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "tunisia",
    "name": "Tunisia",
    "category": "Country",
    "country": "Tunisia",
    "bounds": {
      "west": 7.5,
      "south": 30.2,
      "east": 11.6,
      "north": 37.5
    },
    "center": [
      33.9,
      9.5
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "turkey",
    "name": "Turkey",
    "category": "Country",
    "country": "Turkey",
    "bounds": {
      "west": 25.7,
      "south": 35.8,
      "east": 44.8,
      "north": 42.1
    },
    "center": [
      38.9,
      35.2
    ],
    "zoom": 6,
    "aliases": [
      "Turkiye"
    ]
  },
  {
    "id": "turkmenistan",
    "name": "Turkmenistan",
    "category": "Country",
    "country": "Turkmenistan",
    "bounds": {
      "west": 52.4,
      "south": 35.1,
      "east": 66.7,
      "north": 42.8
    },
    "center": [
      38.9,
      59.6
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "tuvalu",
    "name": "Tuvalu",
    "category": "Country",
    "country": "Tuvalu",
    "bounds": {
      "west": 176.0,
      "south": -10.8,
      "east": 180.0,
      "north": -5.6
    },
    "center": [
      -7.11,
      177.65
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "uganda",
    "name": "Uganda",
    "category": "Country",
    "country": "Uganda",
    "bounds": {
      "west": 29.5,
      "south": -1.5,
      "east": 35.0,
      "north": 4.2
    },
    "center": [
      1.4,
      32.3
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "ukraine",
    "name": "Ukraine",
    "category": "Country",
    "country": "Ukraine",
    "bounds": {
      "west": 22.1,
      "south": 44.4,
      "east": 40.2,
      "north": 52.4
    },
    "center": [
      48.4,
      31.2
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "united-arab-emirates",
    "name": "United Arab Emirates",
    "category": "Country",
    "country": "United Arab Emirates",
    "bounds": {
      "west": 51.6,
      "south": 22.6,
      "east": 56.4,
      "north": 26.1
    },
    "center": [
      23.4,
      53.8
    ],
    "zoom": 7,
    "aliases": [
      "UAE",
      "Emirates"
    ]
  },
  {
    "id": "united-kingdom",
    "name": "United Kingdom",
    "category": "Country",
    "country": "United Kingdom",
    "bounds": {
      "west": -8.6,
      "south": 49.9,
      "east": 1.8,
      "north": 60.9
    },
    "center": [
      55.4,
      -3.4
    ],
    "zoom": 5,
    "aliases": [
      "UK",
      "Britain",
      "Great Britain",
      "England"
    ]
  },
  {
    "id": "united-states",
    "name": "United States",
    "category": "Country",
    "country": "United States",
    "bounds": {
      "west": -125.0,
      "south": 24.5,
      "east": -66.9,
      "north": 49.4
    },
    "center": [
      37.1,
      -95.7
    ],
    "zoom": 4,
    "aliases": [
      "USA",
      "US",
      "America"
    ]
  },
  {
    "id": "uruguay",
    "name": "Uruguay",
    "category": "Country",
    "country": "Uruguay",
    "bounds": {
      "west": -58.4,
      "south": -35.0,
      "east": -53.1,
      "north": -30.1
    },
    "center": [
      -32.5,
      -55.8
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "uzbekistan",
    "name": "Uzbekistan",
    "category": "Country",
    "country": "Uzbekistan",
    "bounds": {
      "west": 56.0,
      "south": 37.2,
      "east": 73.2,
      "north": 45.6
    },
    "center": [
      41.4,
      64.6
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "vanuatu",
    "name": "Vanuatu",
    "category": "Country",
    "country": "Vanuatu",
    "bounds": {
      "west": 166.5,
      "south": -20.3,
      "east": 170.3,
      "north": -13.0
    },
    "center": [
      -15.38,
      166.96
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "vatican-city",
    "name": "Vatican City",
    "category": "Country",
    "country": "Vatican City",
    "bounds": {
      "west": 12.445,
      "south": 41.9,
      "east": 12.458,
      "north": 41.907
    },
    "center": [
      41.903,
      12.453
    ],
    "zoom": 15,
    "aliases": [
      "Holy See"
    ]
  },
  {
    "id": "venezuela",
    "name": "Venezuela",
    "category": "Country",
    "country": "Venezuela",
    "bounds": {
      "west": -73.4,
      "south": 0.6,
      "east": -59.8,
      "north": 12.2
    },
    "center": [
      6.4,
      -66.6
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "vietnam",
    "name": "Vietnam",
    "category": "Country",
    "country": "Vietnam",
    "bounds": {
      "west": 102.1,
      "south": 8.5,
      "east": 109.5,
      "north": 23.4
    },
    "center": [
      14.1,
      108.3
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "yemen",
    "name": "Yemen",
    "category": "Country",
    "country": "Yemen",
    "bounds": {
      "west": 41.8,
      "south": 12.1,
      "east": 54.5,
      "north": 19.0
    },
    "center": [
      15.6,
      48.5
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "zambia",
    "name": "Zambia",
    "category": "Country",
    "country": "Zambia",
    "bounds": {
      "west": 22.0,
      "south": -18.1,
      "east": 33.7,
      "north": -8.2
    },
    "center": [
      -13.1,
      27.8
    ],
    "zoom": 5,
    "aliases": []
  },
  {
    "id": "zimbabwe",
    "name": "Zimbabwe",
    "category": "Country",
    "country": "Zimbabwe",
    "bounds": {
      "west": 25.2,
      "south": -22.4,
      "east": 33.1,
      "north": -15.6
    },
    "center": [
      -19.0,
      29.2
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "andhra-pradesh-india",
    "name": "Andhra Pradesh",
    "category": "State",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 76.7,
      "south": 12.6,
      "east": 84.8,
      "north": 19.9
    },
    "center": [
      15.9,
      79.7
    ],
    "zoom": 7,
    "aliases": [
      "AP"
    ]
  },
  {
    "id": "arunachal-pradesh-india",
    "name": "Arunachal Pradesh",
    "category": "State",
    "adminRegion": "Arunachal Pradesh",
    "country": "India",
    "bounds": {
      "west": 91.5,
      "south": 26.6,
      "east": 97.4,
      "north": 29.5
    },
    "center": [
      28.2,
      94.7
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "assam-india",
    "name": "Assam",
    "category": "State",
    "adminRegion": "Assam",
    "country": "India",
    "bounds": {
      "west": 89.7,
      "south": 24.1,
      "east": 96.0,
      "north": 28.0
    },
    "center": [
      26.2,
      92.9
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "bihar-india",
    "name": "Bihar",
    "category": "State",
    "adminRegion": "Bihar",
    "country": "India",
    "bounds": {
      "west": 83.3,
      "south": 24.3,
      "east": 88.3,
      "north": 27.5
    },
    "center": [
      25.1,
      85.3
    ],
    "zoom": 7,
    "aliases": []
  },
  {
    "id": "chhattisgarh-india",
    "name": "Chhattisgarh",
    "category": "State",
    "adminRegion": "Chhattisgarh",
    "country": "India",
    "bounds": {
      "west": 80.2,
      "south": 17.8,
      "east": 84.4,
      "north": 24.1
    },
    "center": [
      21.3,
      81.9
    ],
    "zoom": 7,
    "aliases": [
      "CG"
    ]
  },
  {
    "id": "goa-india",
    "name": "Goa",
    "category": "State",
    "adminRegion": "Goa",
    "country": "India",
    "bounds": {
      "west": 73.6,
      "south": 14.9,
      "east": 74.3,
      "north": 15.8
    },
    "center": [
      15.3,
      74.1
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "gujarat-india",
    "name": "Gujarat",
    "category": "State",
    "adminRegion": "Gujarat",
    "country": "India",
    "bounds": {
      "west": 68.1,
      "south": 20.1,
      "east": 74.5,
      "north": 24.7
    },
    "center": [
      22.2,
      71.2
    ],
    "zoom": 6,
    "aliases": [
      "GJ"
    ]
  },
  {
    "id": "haryana-india",
    "name": "Haryana",
    "category": "State",
    "adminRegion": "Haryana",
    "country": "India",
    "bounds": {
      "west": 74.5,
      "south": 27.6,
      "east": 77.6,
      "north": 30.9
    },
    "center": [
      29.0,
      76.1
    ],
    "zoom": 7,
    "aliases": [
      "HR"
    ]
  },
  {
    "id": "himachal-pradesh-india",
    "name": "Himachal Pradesh",
    "category": "State",
    "adminRegion": "Himachal Pradesh",
    "country": "India",
    "bounds": {
      "west": 75.6,
      "south": 30.4,
      "east": 79.0,
      "north": 33.2
    },
    "center": [
      31.1,
      77.2
    ],
    "zoom": 7,
    "aliases": [
      "HP"
    ]
  },
  {
    "id": "jharkhand-india",
    "name": "Jharkhand",
    "category": "State",
    "adminRegion": "Jharkhand",
    "country": "India",
    "bounds": {
      "west": 83.3,
      "south": 21.9,
      "east": 87.9,
      "north": 25.3
    },
    "center": [
      23.6,
      85.3
    ],
    "zoom": 7,
    "aliases": [
      "JH"
    ]
  },
  {
    "id": "karnataka-india",
    "name": "Karnataka",
    "category": "State",
    "adminRegion": "Karnataka",
    "country": "India",
    "bounds": {
      "west": 74.0,
      "south": 11.5,
      "east": 78.6,
      "north": 18.5
    },
    "center": [
      15.3,
      75.7
    ],
    "zoom": 7,
    "aliases": [
      "KA"
    ]
  },
  {
    "id": "kerala-india",
    "name": "Kerala",
    "category": "State",
    "adminRegion": "Kerala",
    "country": "India",
    "bounds": {
      "west": 74.8,
      "south": 8.3,
      "east": 77.4,
      "north": 12.8
    },
    "center": [
      10.8,
      76.3
    ],
    "zoom": 7,
    "aliases": [
      "KL"
    ]
  },
  {
    "id": "madhya-pradesh-india",
    "name": "Madhya Pradesh",
    "category": "State",
    "adminRegion": "Madhya Pradesh",
    "country": "India",
    "bounds": {
      "west": 74.0,
      "south": 21.1,
      "east": 82.8,
      "north": 26.9
    },
    "center": [
      22.9,
      78.6
    ],
    "zoom": 6,
    "aliases": [
      "MP"
    ]
  },
  {
    "id": "maharashtra-india",
    "name": "Maharashtra",
    "category": "State",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 72.6,
      "south": 15.6,
      "east": 80.9,
      "north": 22.0
    },
    "center": [
      19.7,
      75.7
    ],
    "zoom": 6,
    "aliases": [
      "MH"
    ]
  },
  {
    "id": "manipur-india",
    "name": "Manipur",
    "category": "State",
    "adminRegion": "Manipur",
    "country": "India",
    "bounds": {
      "west": 93.0,
      "south": 23.8,
      "east": 94.8,
      "north": 25.7
    },
    "center": [
      24.6,
      93.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "meghalaya-india",
    "name": "Meghalaya",
    "category": "State",
    "adminRegion": "Meghalaya",
    "country": "India",
    "bounds": {
      "west": 89.8,
      "south": 25.0,
      "east": 92.8,
      "north": 26.1
    },
    "center": [
      25.4,
      91.3
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "mizoram-india",
    "name": "Mizoram",
    "category": "State",
    "adminRegion": "Mizoram",
    "country": "India",
    "bounds": {
      "west": 92.2,
      "south": 21.9,
      "east": 93.4,
      "north": 24.5
    },
    "center": [
      23.1,
      92.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "nagaland-india",
    "name": "Nagaland",
    "category": "State",
    "adminRegion": "Nagaland",
    "country": "India",
    "bounds": {
      "west": 93.3,
      "south": 25.2,
      "east": 95.2,
      "north": 27.0
    },
    "center": [
      26.1,
      94.5
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "odisha-india",
    "name": "Odisha",
    "category": "State",
    "adminRegion": "Odisha",
    "country": "India",
    "bounds": {
      "west": 81.4,
      "south": 17.8,
      "east": 87.5,
      "north": 22.6
    },
    "center": [
      20.9,
      85.1
    ],
    "zoom": 7,
    "aliases": [
      "Orissa",
      "OD"
    ]
  },
  {
    "id": "punjab-india",
    "name": "Punjab",
    "category": "State",
    "adminRegion": "Punjab",
    "country": "India",
    "bounds": {
      "west": 73.8,
      "south": 29.5,
      "east": 76.9,
      "north": 32.5
    },
    "center": [
      31.1,
      75.3
    ],
    "zoom": 7,
    "aliases": [
      "PB"
    ]
  },
  {
    "id": "rajasthan-india",
    "name": "Rajasthan",
    "category": "State",
    "adminRegion": "Rajasthan",
    "country": "India",
    "bounds": {
      "west": 69.5,
      "south": 23.1,
      "east": 78.3,
      "north": 30.2
    },
    "center": [
      27.0,
      74.2
    ],
    "zoom": 6,
    "aliases": [
      "RJ"
    ]
  },
  {
    "id": "sikkim-india",
    "name": "Sikkim",
    "category": "State",
    "adminRegion": "Sikkim",
    "country": "India",
    "bounds": {
      "west": 88.0,
      "south": 27.0,
      "east": 88.9,
      "north": 28.1
    },
    "center": [
      27.5,
      88.5
    ],
    "zoom": 9,
    "aliases": []
  },
  {
    "id": "tamil-nadu-india",
    "name": "Tamil Nadu",
    "category": "State",
    "adminRegion": "Tamil Nadu",
    "country": "India",
    "bounds": {
      "west": 76.2,
      "south": 8.1,
      "east": 80.3,
      "north": 13.6
    },
    "center": [
      11.1,
      78.6
    ],
    "zoom": 7,
    "aliases": [
      "TN"
    ]
  },
  {
    "id": "telangana-india",
    "name": "Telangana",
    "category": "State",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 77.2,
      "south": 15.8,
      "east": 81.8,
      "north": 19.9
    },
    "center": [
      18.1,
      79.0
    ],
    "zoom": 7,
    "aliases": [
      "TS",
      "TG"
    ]
  },
  {
    "id": "tripura-india",
    "name": "Tripura",
    "category": "State",
    "adminRegion": "Tripura",
    "country": "India",
    "bounds": {
      "west": 91.1,
      "south": 22.9,
      "east": 92.3,
      "north": 24.5
    },
    "center": [
      23.9,
      91.9
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "uttar-pradesh-india",
    "name": "Uttar Pradesh",
    "category": "State",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.1,
      "south": 23.9,
      "east": 84.6,
      "north": 30.4
    },
    "center": [
      26.8,
      80.9
    ],
    "zoom": 6,
    "aliases": [
      "UP"
    ]
  },
  {
    "id": "uttarakhand-india",
    "name": "Uttarakhand",
    "category": "State",
    "adminRegion": "Uttarakhand",
    "country": "India",
    "bounds": {
      "west": 77.6,
      "south": 28.7,
      "east": 81.0,
      "north": 31.5
    },
    "center": [
      30.1,
      79.0
    ],
    "zoom": 7,
    "aliases": [
      "UK",
      "Uttaranchal"
    ]
  },
  {
    "id": "west-bengal-india",
    "name": "West Bengal",
    "category": "State",
    "adminRegion": "West Bengal",
    "country": "India",
    "bounds": {
      "west": 85.8,
      "south": 21.5,
      "east": 89.9,
      "north": 27.2
    },
    "center": [
      22.9,
      87.8
    ],
    "zoom": 7,
    "aliases": [
      "WB",
      "Bangla"
    ]
  },
  {
    "id": "andaman-and-nicobar-islands-india",
    "name": "Andaman and Nicobar Islands",
    "category": "State",
    "adminRegion": "Andaman and Nicobar Islands",
    "country": "India",
    "bounds": {
      "west": 92.1,
      "south": 6.7,
      "east": 94.3,
      "north": 13.7
    },
    "center": [
      11.7,
      92.7
    ],
    "zoom": 7,
    "aliases": [
      "Andaman"
    ]
  },
  {
    "id": "chandigarh-india",
    "name": "Chandigarh",
    "category": "State",
    "adminRegion": "Chandigarh",
    "country": "India",
    "bounds": {
      "west": 76.7,
      "south": 30.7,
      "east": 76.84,
      "north": 30.8
    },
    "center": [
      30.73,
      76.78
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "dadra-and-nagar-haveli-and-daman-and-diu-india",
    "name": "Dadra and Nagar Haveli and Daman and Diu",
    "category": "State",
    "adminRegion": "Dadra and Nagar Haveli and Daman and Diu",
    "country": "India",
    "bounds": {
      "west": 72.8,
      "south": 20.0,
      "east": 73.2,
      "north": 20.5
    },
    "center": [
      20.4,
      72.9
    ],
    "zoom": 9,
    "aliases": [
      "Daman and Diu"
    ]
  },
  {
    "id": "delhi-india",
    "name": "Delhi",
    "category": "State",
    "adminRegion": "Delhi",
    "country": "India",
    "bounds": {
      "west": 76.84,
      "south": 28.4,
      "east": 77.34,
      "north": 28.88
    },
    "center": [
      28.7,
      77.1
    ],
    "zoom": 10,
    "aliases": [
      "New Delhi",
      "NCT",
      "NCR"
    ]
  },
  {
    "id": "jammu-and-kashmir-india",
    "name": "Jammu and Kashmir",
    "category": "State",
    "adminRegion": "Jammu and Kashmir",
    "country": "India",
    "bounds": {
      "west": 73.7,
      "south": 32.3,
      "east": 76.8,
      "north": 35.1
    },
    "center": [
      33.8,
      74.9
    ],
    "zoom": 7,
    "aliases": [
      "J&K"
    ]
  },
  {
    "id": "ladakh-india",
    "name": "Ladakh",
    "category": "State",
    "adminRegion": "Ladakh",
    "country": "India",
    "bounds": {
      "west": 75.5,
      "south": 32.5,
      "east": 79.9,
      "north": 36.0
    },
    "center": [
      34.1,
      77.5
    ],
    "zoom": 6,
    "aliases": []
  },
  {
    "id": "lakshadweep-india",
    "name": "Lakshadweep",
    "category": "State",
    "adminRegion": "Lakshadweep",
    "country": "India",
    "bounds": {
      "west": 71.8,
      "south": 8.2,
      "east": 74.0,
      "north": 12.4
    },
    "center": [
      10.5,
      72.6
    ],
    "zoom": 8,
    "aliases": []
  },
  {
    "id": "puducherry-india",
    "name": "Puducherry",
    "category": "State",
    "adminRegion": "Puducherry",
    "country": "India",
    "bounds": {
      "west": 79.7,
      "south": 11.8,
      "east": 80.0,
      "north": 12.1
    },
    "center": [
      11.9,
      79.8
    ],
    "zoom": 10,
    "aliases": [
      "Pondicherry"
    ]
  },
  {
    "id": "vijayawada-andhra-pradesh-india",
    "name": "Vijayawada",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 80.5,
      "south": 16.42,
      "east": 80.78,
      "north": 16.6
    },
    "center": [
      16.506,
      80.648
    ],
    "zoom": 11,
    "aliases": [
      "Bezawada"
    ]
  },
  {
    "id": "visakhapatnam-andhra-pradesh-india",
    "name": "Visakhapatnam",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 83.1,
      "south": 17.6,
      "east": 83.35,
      "north": 17.85
    },
    "center": [
      17.686,
      83.218
    ],
    "zoom": 11,
    "aliases": [
      "Vizag",
      "Waltair"
    ]
  },
  {
    "id": "guntur-andhra-pradesh-india",
    "name": "Guntur",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 80.35,
      "south": 16.22,
      "east": 80.52,
      "north": 16.38
    },
    "center": [
      16.306,
      80.436
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "tirupati-andhra-pradesh-india",
    "name": "Tirupati",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 79.32,
      "south": 13.55,
      "east": 79.5,
      "north": 13.72
    },
    "center": [
      13.628,
      79.419
    ],
    "zoom": 12,
    "aliases": [
      "Tirumala"
    ]
  },
  {
    "id": "hyderabad-telangana-india",
    "name": "Hyderabad",
    "category": "City",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 78.3,
      "south": 17.25,
      "east": 78.6,
      "north": 17.55
    },
    "center": [
      17.385,
      78.486
    ],
    "zoom": 10,
    "aliases": [
      "Cyberabad",
      "Bhagyanagar"
    ]
  },
  {
    "id": "bengaluru-karnataka-india",
    "name": "Bengaluru",
    "category": "City",
    "adminRegion": "Karnataka",
    "country": "India",
    "bounds": {
      "west": 77.45,
      "south": 12.85,
      "east": 77.75,
      "north": 13.12
    },
    "center": [
      12.971,
      77.594
    ],
    "zoom": 10,
    "aliases": [
      "Bangalore"
    ]
  },
  {
    "id": "chennai-tamil-nadu-india",
    "name": "Chennai",
    "category": "City",
    "adminRegion": "Tamil Nadu",
    "country": "India",
    "bounds": {
      "west": 80.12,
      "south": 12.92,
      "east": 80.35,
      "north": 13.22
    },
    "center": [
      13.082,
      80.27
    ],
    "zoom": 10,
    "aliases": [
      "Madras"
    ]
  },
  {
    "id": "mumbai-maharashtra-india",
    "name": "Mumbai",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 72.75,
      "south": 18.88,
      "east": 73.0,
      "north": 19.28
    },
    "center": [
      19.076,
      72.877
    ],
    "zoom": 10,
    "aliases": [
      "Bombay"
    ]
  },
  {
    "id": "pune-maharashtra-india",
    "name": "Pune",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 73.72,
      "south": 18.42,
      "east": 73.98,
      "north": 18.62
    },
    "center": [
      18.52,
      73.856
    ],
    "zoom": 11,
    "aliases": [
      "Poona"
    ]
  },
  {
    "id": "delhi-delhi-india",
    "name": "Delhi",
    "category": "City",
    "adminRegion": "Delhi",
    "country": "India",
    "bounds": {
      "west": 76.84,
      "south": 28.4,
      "east": 77.34,
      "north": 28.88
    },
    "center": [
      28.704,
      77.102
    ],
    "zoom": 10,
    "aliases": [
      "New Delhi",
      "Dilli"
    ]
  },
  {
    "id": "kolkata-west-bengal-india",
    "name": "Kolkata",
    "category": "City",
    "adminRegion": "West Bengal",
    "country": "India",
    "bounds": {
      "west": 88.25,
      "south": 22.45,
      "east": 88.48,
      "north": 22.7
    },
    "center": [
      22.572,
      88.363
    ],
    "zoom": 10,
    "aliases": [
      "Calcutta"
    ]
  },
  {
    "id": "ahmedabad-gujarat-india",
    "name": "Ahmedabad",
    "category": "City",
    "adminRegion": "Gujarat",
    "country": "India",
    "bounds": {
      "west": 72.45,
      "south": 22.92,
      "east": 72.7,
      "north": 23.12
    },
    "center": [
      23.022,
      72.571
    ],
    "zoom": 11,
    "aliases": [
      "Amdavad"
    ]
  },
  {
    "id": "jaipur-rajasthan-india",
    "name": "Jaipur",
    "category": "City",
    "adminRegion": "Rajasthan",
    "country": "India",
    "bounds": {
      "west": 75.68,
      "south": 26.8,
      "east": 75.92,
      "north": 27.02
    },
    "center": [
      26.912,
      75.787
    ],
    "zoom": 11,
    "aliases": [
      "Pink City"
    ]
  },
  {
    "id": "kochi-kerala-india",
    "name": "Kochi",
    "category": "City",
    "adminRegion": "Kerala",
    "country": "India",
    "bounds": {
      "west": 76.18,
      "south": 9.85,
      "east": 76.38,
      "north": 10.05
    },
    "center": [
      9.931,
      76.267
    ],
    "zoom": 11,
    "aliases": [
      "Cochin",
      "Ernakulam"
    ]
  },
  {
    "id": "kurnool-andhra-pradesh-india",
    "name": "Kurnool",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 78.0,
      "south": 15.78,
      "east": 78.1,
      "north": 15.86
    },
    "center": [
      15.828,
      78.037
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "nellore-andhra-pradesh-india",
    "name": "Nellore",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 79.92,
      "south": 14.4,
      "east": 80.05,
      "north": 14.5
    },
    "center": [
      14.442,
      79.986
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "rajahmundry-andhra-pradesh-india",
    "name": "Rajahmundry",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 81.74,
      "south": 16.95,
      "east": 81.85,
      "north": 17.05
    },
    "center": [
      17.0,
      81.804
    ],
    "zoom": 12,
    "aliases": [
      "Rajamahendravaram"
    ]
  },
  {
    "id": "kakinada-andhra-pradesh-india",
    "name": "Kakinada",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 82.2,
      "south": 16.9,
      "east": 82.3,
      "north": 17.02
    },
    "center": [
      16.989,
      82.247
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "kadapa-andhra-pradesh-india",
    "name": "Kadapa",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 78.78,
      "south": 14.44,
      "east": 78.88,
      "north": 14.52
    },
    "center": [
      14.467,
      78.824
    ],
    "zoom": 12,
    "aliases": [
      "Cuddapah",
      "YSR Kadapa"
    ]
  },
  {
    "id": "anantapur-andhra-pradesh-india",
    "name": "Anantapur",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.56,
      "south": 14.64,
      "east": 77.65,
      "north": 14.72
    },
    "center": [
      14.681,
      77.6
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "eluru-andhra-pradesh-india",
    "name": "Eluru",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 81.06,
      "south": 16.66,
      "east": 81.16,
      "north": 16.74
    },
    "center": [
      16.71,
      81.095
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "ongole-andhra-pradesh-india",
    "name": "Ongole",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 80.0,
      "south": 15.46,
      "east": 80.1,
      "north": 15.54
    },
    "center": [
      15.505,
      80.049
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "machilipatnam-andhra-pradesh-india",
    "name": "Machilipatnam",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 81.1,
      "south": 16.14,
      "east": 81.18,
      "north": 16.22
    },
    "center": [
      16.187,
      81.138
    ],
    "zoom": 12,
    "aliases": [
      "Bandar"
    ]
  },
  {
    "id": "chittoor-andhra-pradesh-india",
    "name": "Chittoor",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 79.06,
      "south": 13.18,
      "east": 79.16,
      "north": 13.26
    },
    "center": [
      13.217,
      79.1
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "srikakulam-andhra-pradesh-india",
    "name": "Srikakulam",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 83.86,
      "south": 18.26,
      "east": 83.94,
      "north": 18.34
    },
    "center": [
      18.297,
      83.896
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "vizianagaram-andhra-pradesh-india",
    "name": "Vizianagaram",
    "category": "City",
    "adminRegion": "Andhra Pradesh",
    "country": "India",
    "bounds": {
      "west": 83.38,
      "south": 18.08,
      "east": 83.46,
      "north": 18.16
    },
    "center": [
      18.113,
      83.403
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "warangal-telangana-india",
    "name": "Warangal",
    "category": "City",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 79.52,
      "south": 17.92,
      "east": 79.66,
      "north": 18.04
    },
    "center": [
      17.968,
      79.594
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "nizamabad-telangana-india",
    "name": "Nizamabad",
    "category": "City",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 78.05,
      "south": 18.63,
      "east": 78.15,
      "north": 18.73
    },
    "center": [
      18.672,
      78.094
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "karimnagar-telangana-india",
    "name": "Karimnagar",
    "category": "City",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 79.1,
      "south": 18.4,
      "east": 79.18,
      "north": 18.48
    },
    "center": [
      18.438,
      79.128
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "khammam-telangana-india",
    "name": "Khammam",
    "category": "City",
    "adminRegion": "Telangana",
    "country": "India",
    "bounds": {
      "west": 80.1,
      "south": 17.2,
      "east": 80.2,
      "north": 17.3
    },
    "center": [
      17.247,
      80.151
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "lucknow-uttar-pradesh-india",
    "name": "Lucknow",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 80.85,
      "south": 26.75,
      "east": 81.05,
      "north": 26.95
    },
    "center": [
      26.846,
      80.946
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "kanpur-uttar-pradesh-india",
    "name": "Kanpur",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 80.25,
      "south": 26.4,
      "east": 80.42,
      "north": 26.54
    },
    "center": [
      26.449,
      80.331
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "varanasi-uttar-pradesh-india",
    "name": "Varanasi",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 82.92,
      "south": 25.26,
      "east": 83.05,
      "north": 25.38
    },
    "center": [
      25.317,
      82.973
    ],
    "zoom": 12,
    "aliases": [
      "Banaras",
      "Kashi"
    ]
  },
  {
    "id": "agra-uttar-pradesh-india",
    "name": "Agra",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.94,
      "south": 27.12,
      "east": 78.08,
      "north": 27.24
    },
    "center": [
      27.176,
      78.008
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "noida-uttar-pradesh-india",
    "name": "Noida",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.3,
      "south": 28.5,
      "east": 77.42,
      "north": 28.62
    },
    "center": [
      28.535,
      77.391
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "prayagraj-uttar-pradesh-india",
    "name": "Prayagraj",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 81.78,
      "south": 25.38,
      "east": 81.92,
      "north": 25.5
    },
    "center": [
      25.435,
      81.846
    ],
    "zoom": 12,
    "aliases": [
      "Allahabad"
    ]
  },
  {
    "id": "meerut-uttar-pradesh-india",
    "name": "Meerut",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.65,
      "south": 28.92,
      "east": 77.78,
      "north": 29.04
    },
    "center": [
      28.984,
      77.706
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "ghaziabad-uttar-pradesh-india",
    "name": "Ghaziabad",
    "category": "City",
    "adminRegion": "Uttar Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.38,
      "south": 28.62,
      "east": 77.48,
      "north": 28.72
    },
    "center": [
      28.669,
      77.453
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "nagpur-maharashtra-india",
    "name": "Nagpur",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 78.98,
      "south": 21.08,
      "east": 79.18,
      "north": 21.22
    },
    "center": [
      21.145,
      79.088
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "nashik-maharashtra-india",
    "name": "Nashik",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 73.72,
      "south": 19.95,
      "east": 73.85,
      "north": 20.06
    },
    "center": [
      19.997,
      73.789
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "thane-maharashtra-india",
    "name": "Thane",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 72.93,
      "south": 19.16,
      "east": 73.02,
      "north": 19.24
    },
    "center": [
      19.218,
      72.978
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "chhatrapati-sambhaji-nagar-maharashtra-india",
    "name": "Chhatrapati Sambhaji Nagar",
    "category": "City",
    "adminRegion": "Maharashtra",
    "country": "India",
    "bounds": {
      "west": 75.28,
      "south": 19.82,
      "east": 75.4,
      "north": 19.94
    },
    "center": [
      19.876,
      75.343
    ],
    "zoom": 12,
    "aliases": [
      "Aurangabad"
    ]
  },
  {
    "id": "surat-gujarat-india",
    "name": "Surat",
    "category": "City",
    "adminRegion": "Gujarat",
    "country": "India",
    "bounds": {
      "west": 72.76,
      "south": 21.12,
      "east": 72.92,
      "north": 21.26
    },
    "center": [
      21.17,
      72.831
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "vadodara-gujarat-india",
    "name": "Vadodara",
    "category": "City",
    "adminRegion": "Gujarat",
    "country": "India",
    "bounds": {
      "west": 73.14,
      "south": 22.25,
      "east": 73.26,
      "north": 22.36
    },
    "center": [
      22.307,
      73.181
    ],
    "zoom": 12,
    "aliases": [
      "Baroda"
    ]
  },
  {
    "id": "rajkot-gujarat-india",
    "name": "Rajkot",
    "category": "City",
    "adminRegion": "Gujarat",
    "country": "India",
    "bounds": {
      "west": 70.74,
      "south": 22.24,
      "east": 70.86,
      "north": 22.34
    },
    "center": [
      22.303,
      70.802
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "indore-madhya-pradesh-india",
    "name": "Indore",
    "category": "City",
    "adminRegion": "Madhya Pradesh",
    "country": "India",
    "bounds": {
      "west": 75.8,
      "south": 22.66,
      "east": 75.94,
      "north": 22.78
    },
    "center": [
      22.719,
      75.857
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "bhopal-madhya-pradesh-india",
    "name": "Bhopal",
    "category": "City",
    "adminRegion": "Madhya Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.34,
      "south": 23.2,
      "east": 77.48,
      "north": 23.32
    },
    "center": [
      23.259,
      77.412
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "gwalior-madhya-pradesh-india",
    "name": "Gwalior",
    "category": "City",
    "adminRegion": "Madhya Pradesh",
    "country": "India",
    "bounds": {
      "west": 78.14,
      "south": 26.18,
      "east": 78.24,
      "north": 26.26
    },
    "center": [
      26.218,
      78.182
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "jabalpur-madhya-pradesh-india",
    "name": "Jabalpur",
    "category": "City",
    "adminRegion": "Madhya Pradesh",
    "country": "India",
    "bounds": {
      "west": 79.9,
      "south": 23.12,
      "east": 80.0,
      "north": 23.22
    },
    "center": [
      23.181,
      79.986
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "patna-bihar-india",
    "name": "Patna",
    "category": "City",
    "adminRegion": "Bihar",
    "country": "India",
    "bounds": {
      "west": 85.06,
      "south": 25.56,
      "east": 85.22,
      "north": 25.66
    },
    "center": [
      25.594,
      85.137
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "ranchi-jharkhand-india",
    "name": "Ranchi",
    "category": "City",
    "adminRegion": "Jharkhand",
    "country": "India",
    "bounds": {
      "west": 85.26,
      "south": 23.3,
      "east": 85.38,
      "north": 23.42
    },
    "center": [
      23.344,
      85.309
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "jamshedpur-jharkhand-india",
    "name": "Jamshedpur",
    "category": "City",
    "adminRegion": "Jharkhand",
    "country": "India",
    "bounds": {
      "west": 86.14,
      "south": 22.74,
      "east": 86.26,
      "north": 22.84
    },
    "center": [
      22.804,
      86.202
    ],
    "zoom": 12,
    "aliases": [
      "Tatanagar"
    ]
  },
  {
    "id": "bhubaneswar-odisha-india",
    "name": "Bhubaneswar",
    "category": "City",
    "adminRegion": "Odisha",
    "country": "India",
    "bounds": {
      "west": 85.76,
      "south": 20.24,
      "east": 85.88,
      "north": 20.36
    },
    "center": [
      20.296,
      85.824
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "cuttack-odisha-india",
    "name": "Cuttack",
    "category": "City",
    "adminRegion": "Odisha",
    "country": "India",
    "bounds": {
      "west": 85.82,
      "south": 20.42,
      "east": 85.94,
      "north": 20.52
    },
    "center": [
      20.462,
      85.882
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "guwahati-assam-india",
    "name": "Guwahati",
    "category": "City",
    "adminRegion": "Assam",
    "country": "India",
    "bounds": {
      "west": 91.68,
      "south": 26.12,
      "east": 91.82,
      "north": 26.22
    },
    "center": [
      26.144,
      91.736
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "chandigarh-chandigarh-india",
    "name": "Chandigarh",
    "category": "City",
    "adminRegion": "Chandigarh",
    "country": "India",
    "bounds": {
      "west": 76.72,
      "south": 30.7,
      "east": 76.84,
      "north": 30.78
    },
    "center": [
      30.733,
      76.779
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "amritsar-punjab-india",
    "name": "Amritsar",
    "category": "City",
    "adminRegion": "Punjab",
    "country": "India",
    "bounds": {
      "west": 74.82,
      "south": 31.58,
      "east": 74.94,
      "north": 31.68
    },
    "center": [
      31.634,
      74.872
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "ludhiana-punjab-india",
    "name": "Ludhiana",
    "category": "City",
    "adminRegion": "Punjab",
    "country": "India",
    "bounds": {
      "west": 75.78,
      "south": 30.86,
      "east": 75.92,
      "north": 30.96
    },
    "center": [
      30.9,
      75.857
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "dehradun-uttarakhand-india",
    "name": "Dehradun",
    "category": "City",
    "adminRegion": "Uttarakhand",
    "country": "India",
    "bounds": {
      "west": 77.98,
      "south": 30.28,
      "east": 78.1,
      "north": 30.38
    },
    "center": [
      30.316,
      78.032
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "shimla-himachal-pradesh-india",
    "name": "Shimla",
    "category": "City",
    "adminRegion": "Himachal Pradesh",
    "country": "India",
    "bounds": {
      "west": 77.12,
      "south": 31.06,
      "east": 77.22,
      "north": 31.14
    },
    "center": [
      31.104,
      77.173
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "srinagar-jammu-and-kashmir-india",
    "name": "Srinagar",
    "category": "City",
    "adminRegion": "Jammu and Kashmir",
    "country": "India",
    "bounds": {
      "west": 74.74,
      "south": 34.04,
      "east": 74.88,
      "north": 34.14
    },
    "center": [
      34.083,
      74.797
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "jammu-jammu-and-kashmir-india",
    "name": "Jammu",
    "category": "City",
    "adminRegion": "Jammu and Kashmir",
    "country": "India",
    "bounds": {
      "west": 74.82,
      "south": 32.68,
      "east": 74.92,
      "north": 32.76
    },
    "center": [
      32.726,
      74.857
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "coimbatore-tamil-nadu-india",
    "name": "Coimbatore",
    "category": "City",
    "adminRegion": "Tamil Nadu",
    "country": "India",
    "bounds": {
      "west": 76.9,
      "south": 10.96,
      "east": 77.04,
      "north": 11.08
    },
    "center": [
      11.016,
      76.955
    ],
    "zoom": 11,
    "aliases": [
      "Kovai"
    ]
  },
  {
    "id": "madurai-tamil-nadu-india",
    "name": "Madurai",
    "category": "City",
    "adminRegion": "Tamil Nadu",
    "country": "India",
    "bounds": {
      "west": 78.06,
      "south": 9.88,
      "east": 78.18,
      "north": 9.98
    },
    "center": [
      9.925,
      78.119
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "thiruvananthapuram-kerala-india",
    "name": "Thiruvananthapuram",
    "category": "City",
    "adminRegion": "Kerala",
    "country": "India",
    "bounds": {
      "west": 76.88,
      "south": 8.46,
      "east": 77.0,
      "north": 8.56
    },
    "center": [
      8.524,
      76.936
    ],
    "zoom": 12,
    "aliases": [
      "Trivandrum"
    ]
  },
  {
    "id": "kozhikode-kerala-india",
    "name": "Kozhikode",
    "category": "City",
    "adminRegion": "Kerala",
    "country": "India",
    "bounds": {
      "west": 75.74,
      "south": 11.22,
      "east": 75.84,
      "north": 11.32
    },
    "center": [
      11.258,
      75.78
    ],
    "zoom": 12,
    "aliases": [
      "Calicut"
    ]
  },
  {
    "id": "mysuru-karnataka-india",
    "name": "Mysuru",
    "category": "City",
    "adminRegion": "Karnataka",
    "country": "India",
    "bounds": {
      "west": 76.6,
      "south": 12.26,
      "east": 76.7,
      "north": 12.36
    },
    "center": [
      12.295,
      76.639
    ],
    "zoom": 12,
    "aliases": [
      "Mysore"
    ]
  },
  {
    "id": "mangaluru-karnataka-india",
    "name": "Mangaluru",
    "category": "City",
    "adminRegion": "Karnataka",
    "country": "India",
    "bounds": {
      "west": 74.82,
      "south": 12.84,
      "east": 74.92,
      "north": 12.92
    },
    "center": [
      12.914,
      74.856
    ],
    "zoom": 12,
    "aliases": [
      "Mangalore"
    ]
  },
  {
    "id": "jodhpur-rajasthan-india",
    "name": "Jodhpur",
    "category": "City",
    "adminRegion": "Rajasthan",
    "country": "India",
    "bounds": {
      "west": 72.95,
      "south": 26.15,
      "east": 73.12,
      "north": 26.35
    },
    "center": [
      26.238,
      73.024
    ],
    "zoom": 12,
    "aliases": [
      "Blue City"
    ]
  },
  {
    "id": "udaipur-rajasthan-india",
    "name": "Udaipur",
    "category": "City",
    "adminRegion": "Rajasthan",
    "country": "India",
    "bounds": {
      "west": 73.66,
      "south": 24.54,
      "east": 73.76,
      "north": 24.64
    },
    "center": [
      24.585,
      73.712
    ],
    "zoom": 12,
    "aliases": [
      "City of Lakes"
    ]
  },
  {
    "id": "raipur-chhattisgarh-india",
    "name": "Raipur",
    "category": "City",
    "adminRegion": "Chhattisgarh",
    "country": "India",
    "bounds": {
      "west": 81.6,
      "south": 21.2,
      "east": 81.7,
      "north": 21.3
    },
    "center": [
      21.251,
      81.629
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "gurugram-haryana-india",
    "name": "Gurugram",
    "category": "City",
    "adminRegion": "Haryana",
    "country": "India",
    "bounds": {
      "west": 76.98,
      "south": 28.4,
      "east": 77.1,
      "north": 28.5
    },
    "center": [
      28.459,
      77.026
    ],
    "zoom": 12,
    "aliases": [
      "Gurgaon"
    ]
  },
  {
    "id": "faridabad-haryana-india",
    "name": "Faridabad",
    "category": "City",
    "adminRegion": "Haryana",
    "country": "India",
    "bounds": {
      "west": 77.26,
      "south": 28.36,
      "east": 77.36,
      "north": 28.46
    },
    "center": [
      28.408,
      77.317
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "imphal-manipur-india",
    "name": "Imphal",
    "category": "City",
    "adminRegion": "Manipur",
    "country": "India",
    "bounds": {
      "west": 93.9,
      "south": 24.78,
      "east": 93.98,
      "north": 24.84
    },
    "center": [
      24.817,
      93.936
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "shillong-meghalaya-india",
    "name": "Shillong",
    "category": "City",
    "adminRegion": "Meghalaya",
    "country": "India",
    "bounds": {
      "west": 91.84,
      "south": 25.54,
      "east": 91.92,
      "north": 25.6
    },
    "center": [
      25.578,
      91.893
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "aizawl-mizoram-india",
    "name": "Aizawl",
    "category": "City",
    "adminRegion": "Mizoram",
    "country": "India",
    "bounds": {
      "west": 92.68,
      "south": 23.7,
      "east": 92.76,
      "north": 23.76
    },
    "center": [
      23.727,
      92.717
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "kohima-nagaland-india",
    "name": "Kohima",
    "category": "City",
    "adminRegion": "Nagaland",
    "country": "India",
    "bounds": {
      "west": 94.06,
      "south": 25.64,
      "east": 94.14,
      "north": 25.7
    },
    "center": [
      25.675,
      94.108
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "gangtok-sikkim-india",
    "name": "Gangtok",
    "category": "City",
    "adminRegion": "Sikkim",
    "country": "India",
    "bounds": {
      "west": 88.58,
      "south": 27.3,
      "east": 88.64,
      "north": 27.36
    },
    "center": [
      27.338,
      88.606
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "agartala-tripura-india",
    "name": "Agartala",
    "category": "City",
    "adminRegion": "Tripura",
    "country": "India",
    "bounds": {
      "west": 91.24,
      "south": 23.8,
      "east": 91.32,
      "north": 23.86
    },
    "center": [
      23.831,
      91.286
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "itanagar-arunachal-pradesh-india",
    "name": "Itanagar",
    "category": "City",
    "adminRegion": "Arunachal Pradesh",
    "country": "India",
    "bounds": {
      "west": 93.58,
      "south": 27.06,
      "east": 93.66,
      "north": 27.12
    },
    "center": [
      27.084,
      93.605
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "panaji-goa-india",
    "name": "Panaji",
    "category": "City",
    "adminRegion": "Goa",
    "country": "India",
    "bounds": {
      "west": 73.8,
      "south": 15.46,
      "east": 73.86,
      "north": 15.52
    },
    "center": [
      15.49,
      73.827
    ],
    "zoom": 12,
    "aliases": [
      "Panjim"
    ]
  },
  {
    "id": "port-blair-andaman-and-nicobar-islands-india",
    "name": "Port Blair",
    "category": "City",
    "adminRegion": "Andaman and Nicobar Islands",
    "country": "India",
    "bounds": {
      "west": 92.68,
      "south": 11.58,
      "east": 92.78,
      "north": 11.72
    },
    "center": [
      11.623,
      92.726
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "leh-ladakh-india",
    "name": "Leh",
    "category": "City",
    "adminRegion": "Ladakh",
    "country": "India",
    "bounds": {
      "west": 77.54,
      "south": 34.12,
      "east": 77.62,
      "north": 34.18
    },
    "center": [
      34.152,
      77.577
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "new-york-new-york-united-states",
    "name": "New York",
    "category": "City",
    "adminRegion": "New York",
    "country": "United States",
    "bounds": {
      "west": -74.25,
      "south": 40.49,
      "east": -73.7,
      "north": 40.91
    },
    "center": [
      40.712,
      -74.006
    ],
    "zoom": 10,
    "aliases": [
      "NYC",
      "New York City"
    ]
  },
  {
    "id": "los-angeles-california-united-states",
    "name": "Los Angeles",
    "category": "City",
    "adminRegion": "California",
    "country": "United States",
    "bounds": {
      "west": -118.66,
      "south": 33.7,
      "east": -118.15,
      "north": 34.33
    },
    "center": [
      34.052,
      -118.243
    ],
    "zoom": 10,
    "aliases": [
      "LA"
    ]
  },
  {
    "id": "chicago-illinois-united-states",
    "name": "Chicago",
    "category": "City",
    "adminRegion": "Illinois",
    "country": "United States",
    "bounds": {
      "west": -87.94,
      "south": 41.64,
      "east": -87.52,
      "north": 42.02
    },
    "center": [
      41.878,
      -87.629
    ],
    "zoom": 10,
    "aliases": [
      "Windy City"
    ]
  },
  {
    "id": "houston-texas-united-states",
    "name": "Houston",
    "category": "City",
    "adminRegion": "Texas",
    "country": "United States",
    "bounds": {
      "west": -95.78,
      "south": 29.52,
      "east": -95.05,
      "north": 30.11
    },
    "center": [
      29.76,
      -95.369
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "san-francisco-california-united-states",
    "name": "San Francisco",
    "category": "City",
    "adminRegion": "California",
    "country": "United States",
    "bounds": {
      "west": -122.52,
      "south": 37.7,
      "east": -122.35,
      "north": 37.83
    },
    "center": [
      37.774,
      -122.419
    ],
    "zoom": 11,
    "aliases": [
      "SF",
      "Bay Area"
    ]
  },
  {
    "id": "seattle-washington-united-states",
    "name": "Seattle",
    "category": "City",
    "adminRegion": "Washington",
    "country": "United States",
    "bounds": {
      "west": -122.44,
      "south": 47.48,
      "east": -122.23,
      "north": 47.74
    },
    "center": [
      47.606,
      -122.332
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "miami-florida-united-states",
    "name": "Miami",
    "category": "City",
    "adminRegion": "Florida",
    "country": "United States",
    "bounds": {
      "west": -80.32,
      "south": 25.7,
      "east": -80.13,
      "north": 25.86
    },
    "center": [
      25.761,
      -80.191
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "boston-massachusetts-united-states",
    "name": "Boston",
    "category": "City",
    "adminRegion": "Massachusetts",
    "country": "United States",
    "bounds": {
      "west": -71.18,
      "south": 42.23,
      "east": -70.99,
      "north": 42.4
    },
    "center": [
      42.36,
      -71.058
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "washington-dc-district-of-columbia-united-states",
    "name": "Washington DC",
    "category": "City",
    "adminRegion": "District of Columbia",
    "country": "United States",
    "bounds": {
      "west": -77.12,
      "south": 38.79,
      "east": -76.9,
      "north": 38.99
    },
    "center": [
      38.907,
      -77.036
    ],
    "zoom": 11,
    "aliases": [
      "DC",
      "Washington"
    ]
  },
  {
    "id": "dallas-texas-united-states",
    "name": "Dallas",
    "category": "City",
    "adminRegion": "Texas",
    "country": "United States",
    "bounds": {
      "west": -96.99,
      "south": 32.61,
      "east": -96.56,
      "north": 33.02
    },
    "center": [
      32.776,
      -96.797
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "austin-texas-united-states",
    "name": "Austin",
    "category": "City",
    "adminRegion": "Texas",
    "country": "United States",
    "bounds": {
      "west": -97.93,
      "south": 30.13,
      "east": -97.56,
      "north": 30.51
    },
    "center": [
      30.267,
      -97.743
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "denver-colorado-united-states",
    "name": "Denver",
    "category": "City",
    "adminRegion": "Colorado",
    "country": "United States",
    "bounds": {
      "west": -105.1,
      "south": 39.61,
      "east": -104.6,
      "north": 39.91
    },
    "center": [
      39.739,
      -104.99
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "atlanta-georgia-united-states",
    "name": "Atlanta",
    "category": "City",
    "adminRegion": "Georgia",
    "country": "United States",
    "bounds": {
      "west": -84.55,
      "south": 33.64,
      "east": -84.28,
      "north": 33.88
    },
    "center": [
      33.749,
      -84.388
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "toronto-ontario-canada",
    "name": "Toronto",
    "category": "City",
    "adminRegion": "Ontario",
    "country": "Canada",
    "bounds": {
      "west": -79.64,
      "south": 43.58,
      "east": -79.11,
      "north": 43.86
    },
    "center": [
      43.653,
      -79.383
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "vancouver-british-columbia-canada",
    "name": "Vancouver",
    "category": "City",
    "adminRegion": "British Columbia",
    "country": "Canada",
    "bounds": {
      "west": -123.27,
      "south": 49.19,
      "east": -123.02,
      "north": 49.32
    },
    "center": [
      49.282,
      -123.12
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "montreal-quebec-canada",
    "name": "Montreal",
    "category": "City",
    "adminRegion": "Quebec",
    "country": "Canada",
    "bounds": {
      "west": -73.99,
      "south": 45.41,
      "east": -73.47,
      "north": 45.71
    },
    "center": [
      45.501,
      -73.567
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "calgary-alberta-canada",
    "name": "Calgary",
    "category": "City",
    "adminRegion": "Alberta",
    "country": "Canada",
    "bounds": {
      "west": -114.28,
      "south": 50.85,
      "east": -113.88,
      "north": 51.21
    },
    "center": [
      51.044,
      -114.071
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "mexico-city-cdmx-mexico",
    "name": "Mexico City",
    "category": "City",
    "adminRegion": "CDMX",
    "country": "Mexico",
    "bounds": {
      "west": -99.36,
      "south": 19.18,
      "east": -98.94,
      "north": 19.59
    },
    "center": [
      19.432,
      -99.133
    ],
    "zoom": 10,
    "aliases": [
      "CDMX"
    ]
  },
  {
    "id": "guadalajara-jalisco-mexico",
    "name": "Guadalajara",
    "category": "City",
    "adminRegion": "Jalisco",
    "country": "Mexico",
    "bounds": {
      "west": -103.42,
      "south": 20.61,
      "east": -103.27,
      "north": 20.74
    },
    "center": [
      20.659,
      -103.349
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "monterrey-nuevo-le\u00f3n-mexico",
    "name": "Monterrey",
    "category": "City",
    "adminRegion": "Nuevo Le\u00f3n",
    "country": "Mexico",
    "bounds": {
      "west": -100.41,
      "south": 25.6,
      "east": -100.22,
      "north": 25.74
    },
    "center": [
      25.686,
      -100.316
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "s\u00e3o-paulo-s\u00e3o-paulo-brazil",
    "name": "S\u00e3o Paulo",
    "category": "City",
    "adminRegion": "S\u00e3o Paulo",
    "country": "Brazil",
    "bounds": {
      "west": -46.83,
      "south": -23.75,
      "east": -46.36,
      "north": -23.38
    },
    "center": [
      -23.55,
      -46.633
    ],
    "zoom": 10,
    "aliases": [
      "Sao Paulo",
      "Sampa"
    ]
  },
  {
    "id": "rio-de-janeiro-rio-de-janeiro-brazil",
    "name": "Rio de Janeiro",
    "category": "City",
    "adminRegion": "Rio de Janeiro",
    "country": "Brazil",
    "bounds": {
      "west": -43.79,
      "south": -23.08,
      "east": -43.1,
      "north": -22.75
    },
    "center": [
      -22.906,
      -43.172
    ],
    "zoom": 10,
    "aliases": [
      "Rio"
    ]
  },
  {
    "id": "bras\u00edlia-federal-district-brazil",
    "name": "Bras\u00edlia",
    "category": "City",
    "adminRegion": "Federal District",
    "country": "Brazil",
    "bounds": {
      "west": -48.05,
      "south": -16.05,
      "east": -47.75,
      "north": -15.65
    },
    "center": [
      -15.797,
      -47.864
    ],
    "zoom": 11,
    "aliases": [
      "Brasilia"
    ]
  },
  {
    "id": "buenos-aires-capital-federal-argentina",
    "name": "Buenos Aires",
    "category": "City",
    "adminRegion": "Capital Federal",
    "country": "Argentina",
    "bounds": {
      "west": -58.53,
      "south": -34.7,
      "east": -58.33,
      "north": -34.53
    },
    "center": [
      -34.603,
      -58.381
    ],
    "zoom": 11,
    "aliases": [
      "CABA"
    ]
  },
  {
    "id": "santiago-santiago-metropolitan-chile",
    "name": "Santiago",
    "category": "City",
    "adminRegion": "Santiago Metropolitan",
    "country": "Chile",
    "bounds": {
      "west": -70.8,
      "south": -33.6,
      "east": -70.5,
      "north": -33.3
    },
    "center": [
      -33.448,
      -70.669
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "lima-lima-province-peru",
    "name": "Lima",
    "category": "City",
    "adminRegion": "Lima Province",
    "country": "Peru",
    "bounds": {
      "west": -77.2,
      "south": -12.25,
      "east": -76.85,
      "north": -11.9
    },
    "center": [
      -12.046,
      -77.042
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "bogot\u00e1-cundinamarca-colombia",
    "name": "Bogot\u00e1",
    "category": "City",
    "adminRegion": "Cundinamarca",
    "country": "Colombia",
    "bounds": {
      "west": -74.25,
      "south": 4.45,
      "east": -73.95,
      "north": 4.85
    },
    "center": [
      4.711,
      -74.072
    ],
    "zoom": 10,
    "aliases": [
      "Bogota"
    ]
  },
  {
    "id": "medell\u00edn-antioquia-colombia",
    "name": "Medell\u00edn",
    "category": "City",
    "adminRegion": "Antioquia",
    "country": "Colombia",
    "bounds": {
      "west": -75.64,
      "south": 6.18,
      "east": -75.52,
      "north": 6.32
    },
    "center": [
      6.244,
      -75.581
    ],
    "zoom": 11,
    "aliases": [
      "Medellin"
    ]
  },
  {
    "id": "quito-pichincha-ecuador",
    "name": "Quito",
    "category": "City",
    "adminRegion": "Pichincha",
    "country": "Ecuador",
    "bounds": {
      "west": -78.58,
      "south": -0.35,
      "east": -78.43,
      "north": -0.1
    },
    "center": [
      -0.18,
      -78.467
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "montevideo-montevideo-uruguay",
    "name": "Montevideo",
    "category": "City",
    "adminRegion": "Montevideo",
    "country": "Uruguay",
    "bounds": {
      "west": -56.28,
      "south": -34.94,
      "east": -56.05,
      "north": -34.8
    },
    "center": [
      -34.901,
      -56.164
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "asunci\u00f3n-capital-paraguay",
    "name": "Asunci\u00f3n",
    "category": "City",
    "adminRegion": "Capital",
    "country": "Paraguay",
    "bounds": {
      "west": -57.68,
      "south": -25.35,
      "east": -57.54,
      "north": -25.24
    },
    "center": [
      -25.263,
      -57.575
    ],
    "zoom": 11,
    "aliases": [
      "Asuncion"
    ]
  },
  {
    "id": "caracas-capital-district-venezuela",
    "name": "Caracas",
    "category": "City",
    "adminRegion": "Capital District",
    "country": "Venezuela",
    "bounds": {
      "west": -67.02,
      "south": 10.44,
      "east": -66.83,
      "north": 10.54
    },
    "center": [
      10.48,
      -66.903
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "london-greater-london-united-kingdom",
    "name": "London",
    "category": "City",
    "adminRegion": "Greater London",
    "country": "United Kingdom",
    "bounds": {
      "west": -0.51,
      "south": 51.28,
      "east": 0.33,
      "north": 51.69
    },
    "center": [
      51.507,
      -0.127
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "paris-\u00eele-de-france-france",
    "name": "Paris",
    "category": "City",
    "adminRegion": "\u00cele-de-France",
    "country": "France",
    "bounds": {
      "west": 2.22,
      "south": 48.81,
      "east": 2.47,
      "north": 48.9
    },
    "center": [
      48.856,
      2.352
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "berlin-berlin-germany",
    "name": "Berlin",
    "category": "City",
    "adminRegion": "Berlin",
    "country": "Germany",
    "bounds": {
      "west": 13.08,
      "south": 52.33,
      "east": 13.76,
      "north": 52.68
    },
    "center": [
      52.52,
      13.405
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "madrid-community-of-madrid-spain",
    "name": "Madrid",
    "category": "City",
    "adminRegion": "Community of Madrid",
    "country": "Spain",
    "bounds": {
      "west": -3.89,
      "south": 40.31,
      "east": -3.52,
      "north": 40.56
    },
    "center": [
      40.416,
      -3.703
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "rome-lazio-italy",
    "name": "Rome",
    "category": "City",
    "adminRegion": "Lazio",
    "country": "Italy",
    "bounds": {
      "west": 12.35,
      "south": 41.77,
      "east": 12.65,
      "north": 42.02
    },
    "center": [
      41.902,
      12.496
    ],
    "zoom": 11,
    "aliases": [
      "Roma"
    ]
  },
  {
    "id": "athens-attica-greece",
    "name": "Athens",
    "category": "City",
    "adminRegion": "Attica",
    "country": "Greece",
    "bounds": {
      "west": 23.65,
      "south": 37.92,
      "east": 23.8,
      "north": 38.05
    },
    "center": [
      37.983,
      23.727
    ],
    "zoom": 11,
    "aliases": [
      "Athina"
    ]
  },
  {
    "id": "lisbon-lisbon-district-portugal",
    "name": "Lisbon",
    "category": "City",
    "adminRegion": "Lisbon District",
    "country": "Portugal",
    "bounds": {
      "west": -9.25,
      "south": 38.69,
      "east": -9.08,
      "north": 38.8
    },
    "center": [
      38.722,
      -9.139
    ],
    "zoom": 11,
    "aliases": [
      "Lisboa"
    ]
  },
  {
    "id": "amsterdam-north-holland-netherlands",
    "name": "Amsterdam",
    "category": "City",
    "adminRegion": "North Holland",
    "country": "Netherlands",
    "bounds": {
      "west": 4.72,
      "south": 52.28,
      "east": 5.08,
      "north": 52.43
    },
    "center": [
      52.367,
      4.904
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "vienna-vienna-austria",
    "name": "Vienna",
    "category": "City",
    "adminRegion": "Vienna",
    "country": "Austria",
    "bounds": {
      "west": 16.18,
      "south": 48.11,
      "east": 16.58,
      "north": 48.32
    },
    "center": [
      48.208,
      16.373
    ],
    "zoom": 11,
    "aliases": [
      "Wien"
    ]
  },
  {
    "id": "warsaw-masovian-poland",
    "name": "Warsaw",
    "category": "City",
    "adminRegion": "Masovian",
    "country": "Poland",
    "bounds": {
      "west": 20.85,
      "south": 52.09,
      "east": 21.27,
      "north": 52.37
    },
    "center": [
      52.229,
      21.012
    ],
    "zoom": 11,
    "aliases": [
      "Warszawa"
    ]
  },
  {
    "id": "stockholm-stockholm-county-sweden",
    "name": "Stockholm",
    "category": "City",
    "adminRegion": "Stockholm County",
    "country": "Sweden",
    "bounds": {
      "west": 17.85,
      "south": 59.22,
      "east": 18.25,
      "north": 59.42
    },
    "center": [
      59.329,
      18.068
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "oslo-oslo-county-norway",
    "name": "Oslo",
    "category": "City",
    "adminRegion": "Oslo County",
    "country": "Norway",
    "bounds": {
      "west": 10.55,
      "south": 59.8,
      "east": 10.95,
      "north": 60.0
    },
    "center": [
      59.913,
      10.752
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "copenhagen-capital-region-denmark",
    "name": "Copenhagen",
    "category": "City",
    "adminRegion": "Capital Region",
    "country": "Denmark",
    "bounds": {
      "west": 12.45,
      "south": 55.61,
      "east": 12.68,
      "north": 55.73
    },
    "center": [
      55.676,
      12.568
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "dublin-leinster-ireland",
    "name": "Dublin",
    "category": "City",
    "adminRegion": "Leinster",
    "country": "Ireland",
    "bounds": {
      "west": -6.38,
      "south": 53.28,
      "east": -6.15,
      "north": 53.42
    },
    "center": [
      53.349,
      -6.26
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "brussels-brussels-capital-belgium",
    "name": "Brussels",
    "category": "City",
    "adminRegion": "Brussels-Capital",
    "country": "Belgium",
    "bounds": {
      "west": 4.28,
      "south": 50.8,
      "east": 4.45,
      "north": 50.9
    },
    "center": [
      50.85,
      4.351
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "kyiv-kyiv-city-ukraine",
    "name": "Kyiv",
    "category": "City",
    "adminRegion": "Kyiv City",
    "country": "Ukraine",
    "bounds": {
      "west": 30.25,
      "south": 50.3,
      "east": 30.85,
      "north": 50.6
    },
    "center": [
      50.45,
      30.523
    ],
    "zoom": 10,
    "aliases": [
      "Kiev"
    ]
  },
  {
    "id": "moscow-moscow-federal-city-russia",
    "name": "Moscow",
    "category": "City",
    "adminRegion": "Moscow Federal City",
    "country": "Russia",
    "bounds": {
      "west": 37.35,
      "south": 55.55,
      "east": 37.85,
      "north": 55.95
    },
    "center": [
      55.755,
      37.617
    ],
    "zoom": 10,
    "aliases": [
      "Moskva"
    ]
  },
  {
    "id": "istanbul-istanbul-province-turkey",
    "name": "Istanbul",
    "category": "City",
    "adminRegion": "Istanbul Province",
    "country": "Turkey",
    "bounds": {
      "west": 28.6,
      "south": 40.85,
      "east": 29.4,
      "north": 41.35
    },
    "center": [
      41.008,
      28.978
    ],
    "zoom": 10,
    "aliases": [
      "Constantinople"
    ]
  },
  {
    "id": "cairo-cairo-governorate-egypt",
    "name": "Cairo",
    "category": "City",
    "adminRegion": "Cairo Governorate",
    "country": "Egypt",
    "bounds": {
      "west": 31.15,
      "south": 29.95,
      "east": 31.45,
      "north": 30.15
    },
    "center": [
      30.044,
      31.235
    ],
    "zoom": 11,
    "aliases": [
      "Al-Qahirah"
    ]
  },
  {
    "id": "johannesburg-gauteng-south-africa",
    "name": "Johannesburg",
    "category": "City",
    "adminRegion": "Gauteng",
    "country": "South Africa",
    "bounds": {
      "west": 27.9,
      "south": -26.35,
      "east": 28.2,
      "north": -26.1
    },
    "center": [
      -26.204,
      28.047
    ],
    "zoom": 11,
    "aliases": [
      "Joburg"
    ]
  },
  {
    "id": "cape-town-western-cape-south-africa",
    "name": "Cape Town",
    "category": "City",
    "adminRegion": "Western Cape",
    "country": "South Africa",
    "bounds": {
      "west": 18.35,
      "south": -34.15,
      "east": 18.65,
      "north": -33.85
    },
    "center": [
      -33.924,
      18.424
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "nairobi-nairobi-county-kenya",
    "name": "Nairobi",
    "category": "City",
    "adminRegion": "Nairobi County",
    "country": "Kenya",
    "bounds": {
      "west": 36.65,
      "south": -1.4,
      "east": 37.05,
      "north": -1.15
    },
    "center": [
      -1.292,
      36.821
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "lagos-lagos-state-nigeria",
    "name": "Lagos",
    "category": "City",
    "adminRegion": "Lagos State",
    "country": "Nigeria",
    "bounds": {
      "west": 3.2,
      "south": 6.4,
      "east": 3.55,
      "north": 6.65
    },
    "center": [
      6.524,
      3.379
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "casablanca-casablanca-settat-morocco",
    "name": "Casablanca",
    "category": "City",
    "adminRegion": "Casablanca-Settat",
    "country": "Morocco",
    "bounds": {
      "west": -7.75,
      "south": 33.48,
      "east": -7.5,
      "north": 33.65
    },
    "center": [
      33.573,
      -7.589
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "addis-ababa-addis-ababa-ethiopia",
    "name": "Addis Ababa",
    "category": "City",
    "adminRegion": "Addis Ababa",
    "country": "Ethiopia",
    "bounds": {
      "west": 38.65,
      "south": 8.85,
      "east": 38.85,
      "north": 9.08
    },
    "center": [
      9.03,
      38.74
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "kinshasa-kinshasa-democratic-republic-of-the-congo",
    "name": "Kinshasa",
    "category": "City",
    "adminRegion": "Kinshasa",
    "country": "Democratic Republic of the Congo",
    "bounds": {
      "west": 15.2,
      "south": -4.45,
      "east": 15.45,
      "north": -4.25
    },
    "center": [
      -4.441,
      15.266
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "accra-greater-accra-ghana",
    "name": "Accra",
    "category": "City",
    "adminRegion": "Greater Accra",
    "country": "Ghana",
    "bounds": {
      "west": -0.3,
      "south": 5.5,
      "east": -0.1,
      "north": 5.65
    },
    "center": [
      5.603,
      -0.187
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "algiers-algiers-province-algeria",
    "name": "Algiers",
    "category": "City",
    "adminRegion": "Algiers Province",
    "country": "Algeria",
    "bounds": {
      "west": 2.98,
      "south": 36.68,
      "east": 3.16,
      "north": 36.8
    },
    "center": [
      36.753,
      3.058
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "tokyo-tokyo-metropolis-japan",
    "name": "Tokyo",
    "category": "City",
    "adminRegion": "Tokyo Metropolis",
    "country": "Japan",
    "bounds": {
      "west": 139.55,
      "south": 35.55,
      "east": 139.9,
      "north": 35.85
    },
    "center": [
      35.676,
      139.65
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "osaka-osaka-prefecture-japan",
    "name": "Osaka",
    "category": "City",
    "adminRegion": "Osaka Prefecture",
    "country": "Japan",
    "bounds": {
      "west": 135.4,
      "south": 34.58,
      "east": 135.6,
      "north": 34.78
    },
    "center": [
      34.693,
      135.502
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "beijing-beijing-municipality-china",
    "name": "Beijing",
    "category": "City",
    "adminRegion": "Beijing Municipality",
    "country": "China",
    "bounds": {
      "west": 116.15,
      "south": 39.75,
      "east": 116.65,
      "north": 40.15
    },
    "center": [
      39.904,
      116.407
    ],
    "zoom": 10,
    "aliases": [
      "Peking"
    ]
  },
  {
    "id": "shanghai-shanghai-municipality-china",
    "name": "Shanghai",
    "category": "City",
    "adminRegion": "Shanghai Municipality",
    "country": "China",
    "bounds": {
      "west": 121.2,
      "south": 31.0,
      "east": 121.75,
      "north": 31.45
    },
    "center": [
      31.23,
      121.473
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "seoul-seoul-capital-area-south-korea",
    "name": "Seoul",
    "category": "City",
    "adminRegion": "Seoul Capital Area",
    "country": "South Korea",
    "bounds": {
      "west": 126.8,
      "south": 37.45,
      "east": 127.18,
      "north": 37.68
    },
    "center": [
      37.566,
      126.978
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "singapore-central-region-singapore",
    "name": "Singapore",
    "category": "City",
    "adminRegion": "Central Region",
    "country": "Singapore",
    "bounds": {
      "west": 103.65,
      "south": 1.22,
      "east": 104.0,
      "north": 1.47
    },
    "center": [
      1.352,
      103.819
    ],
    "zoom": 11,
    "aliases": [
      "Lion City"
    ]
  },
  {
    "id": "bangkok-bangkok-thailand",
    "name": "Bangkok",
    "category": "City",
    "adminRegion": "Bangkok",
    "country": "Thailand",
    "bounds": {
      "west": 100.35,
      "south": 13.6,
      "east": 100.75,
      "north": 13.95
    },
    "center": [
      13.756,
      100.501
    ],
    "zoom": 10,
    "aliases": [
      "Krung Thep"
    ]
  },
  {
    "id": "jakarta-dki-jakarta-indonesia",
    "name": "Jakarta",
    "category": "City",
    "adminRegion": "DKI Jakarta",
    "country": "Indonesia",
    "bounds": {
      "west": 106.68,
      "south": -6.37,
      "east": 107.0,
      "north": -6.1
    },
    "center": [
      -6.208,
      106.845
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "manila-metro-manila-philippines",
    "name": "Manila",
    "category": "City",
    "adminRegion": "Metro Manila",
    "country": "Philippines",
    "bounds": {
      "west": 120.93,
      "south": 14.53,
      "east": 121.03,
      "north": 14.65
    },
    "center": [
      14.599,
      120.984
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "hanoi-hanoi-vietnam",
    "name": "Hanoi",
    "category": "City",
    "adminRegion": "Hanoi",
    "country": "Vietnam",
    "bounds": {
      "west": 105.7,
      "south": 20.95,
      "east": 105.95,
      "north": 21.15
    },
    "center": [
      21.028,
      105.854
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "ho-chi-minh-city-southeast-vietnam",
    "name": "Ho Chi Minh City",
    "category": "City",
    "adminRegion": "Southeast",
    "country": "Vietnam",
    "bounds": {
      "west": 106.55,
      "south": 10.65,
      "east": 106.85,
      "north": 10.9
    },
    "center": [
      10.823,
      106.629
    ],
    "zoom": 10,
    "aliases": [
      "Saigon"
    ]
  },
  {
    "id": "kuala-lumpur-federal-territory-malaysia",
    "name": "Kuala Lumpur",
    "category": "City",
    "adminRegion": "Federal Territory",
    "country": "Malaysia",
    "bounds": {
      "west": 101.6,
      "south": 3.05,
      "east": 101.78,
      "north": 3.25
    },
    "center": [
      3.139,
      101.686
    ],
    "zoom": 11,
    "aliases": [
      "KL"
    ]
  },
  {
    "id": "dubai-emirate-of-dubai-united-arab-emirates",
    "name": "Dubai",
    "category": "City",
    "adminRegion": "Emirate of Dubai",
    "country": "United Arab Emirates",
    "bounds": {
      "west": 55.1,
      "south": 24.95,
      "east": 55.45,
      "north": 25.35
    },
    "center": [
      25.204,
      55.27
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "abu-dhabi-emirate-of-abu-dhabi-united-arab-emirates",
    "name": "Abu Dhabi",
    "category": "City",
    "adminRegion": "Emirate of Abu Dhabi",
    "country": "United Arab Emirates",
    "bounds": {
      "west": 54.3,
      "south": 24.35,
      "east": 54.55,
      "north": 24.55
    },
    "center": [
      24.453,
      54.377
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "riyadh-riyadh-province-saudi-arabia",
    "name": "Riyadh",
    "category": "City",
    "adminRegion": "Riyadh Province",
    "country": "Saudi Arabia",
    "bounds": {
      "west": 46.55,
      "south": 24.55,
      "east": 46.85,
      "north": 24.85
    },
    "center": [
      24.713,
      46.675
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "doha-doha-municipality-qatar",
    "name": "Doha",
    "category": "City",
    "adminRegion": "Doha Municipality",
    "country": "Qatar",
    "bounds": {
      "west": 51.45,
      "south": 25.2,
      "east": 51.6,
      "north": 25.38
    },
    "center": [
      25.285,
      51.531
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "karachi-sindh-pakistan",
    "name": "Karachi",
    "category": "City",
    "adminRegion": "Sindh",
    "country": "Pakistan",
    "bounds": {
      "west": 66.85,
      "south": 24.75,
      "east": 67.35,
      "north": 25.1
    },
    "center": [
      24.86,
      67.001
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "lahore-punjab-pakistan",
    "name": "Lahore",
    "category": "City",
    "adminRegion": "Punjab",
    "country": "Pakistan",
    "bounds": {
      "west": 74.2,
      "south": 31.4,
      "east": 74.45,
      "north": 31.65
    },
    "center": [
      31.52,
      74.358
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "islamabad-islamabad-capital-territory-pakistan",
    "name": "Islamabad",
    "category": "City",
    "adminRegion": "Islamabad Capital Territory",
    "country": "Pakistan",
    "bounds": {
      "west": 72.95,
      "south": 33.6,
      "east": 73.2,
      "north": 33.78
    },
    "center": [
      33.684,
      73.047
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "dhaka-dhaka-division-bangladesh",
    "name": "Dhaka",
    "category": "City",
    "adminRegion": "Dhaka Division",
    "country": "Bangladesh",
    "bounds": {
      "west": 90.3,
      "south": 23.65,
      "east": 90.5,
      "north": 23.9
    },
    "center": [
      23.81,
      90.412
    ],
    "zoom": 11,
    "aliases": [
      "Dacca"
    ]
  },
  {
    "id": "colombo-western-province-sri-lanka",
    "name": "Colombo",
    "category": "City",
    "adminRegion": "Western Province",
    "country": "Sri Lanka",
    "bounds": {
      "west": 79.82,
      "south": 6.87,
      "east": 79.93,
      "north": 6.98
    },
    "center": [
      6.927,
      79.861
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "kathmandu-bagmati-province-nepal",
    "name": "Kathmandu",
    "category": "City",
    "adminRegion": "Bagmati Province",
    "country": "Nepal",
    "bounds": {
      "west": 85.25,
      "south": 27.65,
      "east": 85.38,
      "north": 27.75
    },
    "center": [
      27.717,
      85.323
    ],
    "zoom": 12,
    "aliases": []
  },
  {
    "id": "sydney-new-south-wales-australia",
    "name": "Sydney",
    "category": "City",
    "adminRegion": "New South Wales",
    "country": "Australia",
    "bounds": {
      "west": 150.95,
      "south": -34.05,
      "east": 151.35,
      "north": -33.65
    },
    "center": [
      -33.868,
      151.209
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "melbourne-victoria-australia",
    "name": "Melbourne",
    "category": "City",
    "adminRegion": "Victoria",
    "country": "Australia",
    "bounds": {
      "west": 144.75,
      "south": -38.05,
      "east": 145.25,
      "north": -37.65
    },
    "center": [
      -37.813,
      144.963
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "brisbane-queensland-australia",
    "name": "Brisbane",
    "category": "City",
    "adminRegion": "Queensland",
    "country": "Australia",
    "bounds": {
      "west": 152.85,
      "south": -27.65,
      "east": 153.25,
      "north": -27.3
    },
    "center": [
      -27.469,
      153.025
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "perth-western-australia-australia",
    "name": "Perth",
    "category": "City",
    "adminRegion": "Western Australia",
    "country": "Australia",
    "bounds": {
      "west": 115.65,
      "south": -32.15,
      "east": 116.05,
      "north": -31.75
    },
    "center": [
      -31.95,
      115.86
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "adelaide-south-australia-australia",
    "name": "Adelaide",
    "category": "City",
    "adminRegion": "South Australia",
    "country": "Australia",
    "bounds": {
      "west": 138.45,
      "south": -35.05,
      "east": 138.75,
      "north": -34.8
    },
    "center": [
      -34.928,
      138.6
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "auckland-auckland-region-new-zealand",
    "name": "Auckland",
    "category": "City",
    "adminRegion": "Auckland Region",
    "country": "New Zealand",
    "bounds": {
      "west": 174.6,
      "south": -37.05,
      "east": 174.95,
      "north": -36.75
    },
    "center": [
      -36.848,
      174.763
    ],
    "zoom": 10,
    "aliases": []
  },
  {
    "id": "wellington-wellington-region-new-zealand",
    "name": "Wellington",
    "category": "City",
    "adminRegion": "Wellington Region",
    "country": "New Zealand",
    "bounds": {
      "west": 174.7,
      "south": -41.35,
      "east": 174.85,
      "north": -41.22
    },
    "center": [
      -41.286,
      174.776
    ],
    "zoom": 11,
    "aliases": []
  },
  {
    "id": "hyderabad-sindh-pakistan",
    "name": "Hyderabad",
    "category": "City",
    "adminRegion": "Sindh",
    "country": "Pakistan",
    "bounds": {
      "west": 68.25,
      "south": 25.3,
      "east": 68.45,
      "north": 25.5
    },
    "center": [
      25.396,
      68.357
    ],
    "zoom": 11,
    "aliases": [
      "Hyderabad Pakistan"
    ]
  },
  {
    "id": "cambridge-cambridgeshire-united-kingdom",
    "name": "Cambridge",
    "category": "City",
    "adminRegion": "Cambridgeshire",
    "country": "United Kingdom",
    "bounds": {
      "west": 0.08,
      "south": 52.17,
      "east": 0.18,
      "north": 52.24
    },
    "center": [
      52.205,
      0.121
    ],
    "zoom": 12,
    "aliases": [
      "Cambridge UK"
    ]
  },
  {
    "id": "cambridge-massachusetts-united-states",
    "name": "Cambridge",
    "category": "City",
    "adminRegion": "Massachusetts",
    "country": "United States",
    "bounds": {
      "west": -71.16,
      "south": 42.35,
      "east": -71.06,
      "north": 42.4
    },
    "center": [
      42.373,
      -71.109
    ],
    "zoom": 12,
    "aliases": [
      "Cambridge MA",
      "Harvard"
    ]
  },
  {
    "id": "melbourne-florida-united-states",
    "name": "Melbourne",
    "category": "City",
    "adminRegion": "Florida",
    "country": "United States",
    "bounds": {
      "west": -80.72,
      "south": 28.02,
      "east": -80.58,
      "north": 28.16
    },
    "center": [
      28.083,
      -80.608
    ],
    "zoom": 12,
    "aliases": [
      "Melbourne FL"
    ]
  },
  {
    "id": "portland-oregon-united-states",
    "name": "Portland",
    "category": "City",
    "adminRegion": "Oregon",
    "country": "United States",
    "bounds": {
      "west": -122.83,
      "south": 45.43,
      "east": -122.47,
      "north": 45.65
    },
    "center": [
      45.515,
      -122.678
    ],
    "zoom": 11,
    "aliases": [
      "PDX",
      "Portland OR"
    ]
  },
  {
    "id": "portland-maine-united-states",
    "name": "Portland",
    "category": "City",
    "adminRegion": "Maine",
    "country": "United States",
    "bounds": {
      "west": -70.35,
      "south": 43.62,
      "east": -70.21,
      "north": 43.72
    },
    "center": [
      43.659,
      -70.256
    ],
    "zoom": 12,
    "aliases": [
      "Portland ME"
    ]
  },
  {
    "id": "springfield-illinois-united-states",
    "name": "Springfield",
    "category": "City",
    "adminRegion": "Illinois",
    "country": "United States",
    "bounds": {
      "west": -89.72,
      "south": 39.72,
      "east": -89.58,
      "north": 39.84
    },
    "center": [
      39.781,
      -89.65
    ],
    "zoom": 12,
    "aliases": [
      "Springfield IL"
    ]
  },
  {
    "id": "springfield-massachusetts-united-states",
    "name": "Springfield",
    "category": "City",
    "adminRegion": "Massachusetts",
    "country": "United States",
    "bounds": {
      "west": -72.63,
      "south": 42.08,
      "east": -72.49,
      "north": 42.17
    },
    "center": [
      42.101,
      -72.589
    ],
    "zoom": 12,
    "aliases": [
      "Springfield MA"
    ]
  },
  {
    "id": "santiago-de-compostela-galicia-spain",
    "name": "Santiago de Compostela",
    "category": "City",
    "adminRegion": "Galicia",
    "country": "Spain",
    "bounds": {
      "west": -8.6,
      "south": 42.82,
      "east": -8.48,
      "north": 42.92
    },
    "center": [
      42.878,
      -8.544
    ],
    "zoom": 12,
    "aliases": [
      "Santiago Spain"
    ]
  },
  {
    "id": "california-united-states",
    "name": "California",
    "category": "State",
    "adminRegion": "California",
    "country": "United States",
    "bounds": {
      "west": -124.4,
      "south": 32.5,
      "east": -114.1,
      "north": 42.0
    },
    "center": [
      36.7,
      -119.4
    ],
    "zoom": 6,
    "aliases": [
      "CA",
      "Cali"
    ]
  },
  {
    "id": "texas-united-states",
    "name": "Texas",
    "category": "State",
    "adminRegion": "Texas",
    "country": "United States",
    "bounds": {
      "west": -106.6,
      "south": 25.8,
      "east": -93.5,
      "north": 36.5
    },
    "center": [
      31.9,
      -99.9
    ],
    "zoom": 5,
    "aliases": [
      "TX",
      "Lone Star State"
    ]
  },
  {
    "id": "florida-united-states",
    "name": "Florida",
    "category": "State",
    "adminRegion": "Florida",
    "country": "United States",
    "bounds": {
      "west": -87.6,
      "south": 24.5,
      "east": -80.0,
      "north": 31.0
    },
    "center": [
      27.6,
      -81.5
    ],
    "zoom": 6,
    "aliases": [
      "FL",
      "Sunshine State"
    ]
  },
  {
    "id": "new-york-state-united-states",
    "name": "New York State",
    "category": "State",
    "adminRegion": "New York State",
    "country": "United States",
    "bounds": {
      "west": -79.8,
      "south": 40.5,
      "east": -71.8,
      "north": 45.0
    },
    "center": [
      43.0,
      -75.0
    ],
    "zoom": 6,
    "aliases": [
      "NY State"
    ]
  },
  {
    "id": "washington-state-united-states",
    "name": "Washington State",
    "category": "State",
    "adminRegion": "Washington State",
    "country": "United States",
    "bounds": {
      "west": -124.8,
      "south": 45.5,
      "east": -116.9,
      "north": 49.0
    },
    "center": [
      47.7,
      -120.7
    ],
    "zoom": 6,
    "aliases": [
      "WA State"
    ]
  },
  {
    "id": "oregon-united-states",
    "name": "Oregon",
    "category": "State",
    "adminRegion": "Oregon",
    "country": "United States",
    "bounds": {
      "west": -124.6,
      "south": 42.0,
      "east": -116.5,
      "north": 46.3
    },
    "center": [
      43.8,
      -120.5
    ],
    "zoom": 6,
    "aliases": [
      "OR"
    ]
  },
  {
    "id": "alaska-united-states",
    "name": "Alaska",
    "category": "State",
    "adminRegion": "Alaska",
    "country": "United States",
    "bounds": {
      "west": -179.9,
      "south": 51.2,
      "east": -129.9,
      "north": 71.4
    },
    "center": [
      64.2,
      -152.4
    ],
    "zoom": 4,
    "aliases": [
      "AK"
    ]
  },
  {
    "id": "hawaii-united-states",
    "name": "Hawaii",
    "category": "State",
    "adminRegion": "Hawaii",
    "country": "United States",
    "bounds": {
      "west": -160.3,
      "south": 18.9,
      "east": -154.8,
      "north": 22.3
    },
    "center": [
      19.8,
      -155.5
    ],
    "zoom": 7,
    "aliases": [
      "HI"
    ]
  },
  {
    "id": "colorado-united-states",
    "name": "Colorado",
    "category": "State",
    "adminRegion": "Colorado",
    "country": "United States",
    "bounds": {
      "west": -109.1,
      "south": 37.0,
      "east": -102.0,
      "north": 41.0
    },
    "center": [
      39.5,
      -105.7
    ],
    "zoom": 6,
    "aliases": [
      "CO"
    ]
  },
  {
    "id": "illinois-united-states",
    "name": "Illinois",
    "category": "State",
    "adminRegion": "Illinois",
    "country": "United States",
    "bounds": {
      "west": -91.5,
      "south": 36.9,
      "east": -87.5,
      "north": 42.5
    },
    "center": [
      40.6,
      -89.3
    ],
    "zoom": 6,
    "aliases": [
      "IL"
    ]
  },
  {
    "id": "ontario-canada",
    "name": "Ontario",
    "category": "Province",
    "adminRegion": "Ontario",
    "country": "Canada",
    "bounds": {
      "west": -95.1,
      "south": 41.7,
      "east": -74.3,
      "north": 56.8
    },
    "center": [
      51.2,
      -85.3
    ],
    "zoom": 5,
    "aliases": [
      "ON"
    ]
  },
  {
    "id": "quebec-canada",
    "name": "Quebec",
    "category": "Province",
    "adminRegion": "Quebec",
    "country": "Canada",
    "bounds": {
      "west": -79.8,
      "south": 45.0,
      "east": -57.1,
      "north": 62.6
    },
    "center": [
      52.9,
      -73.5
    ],
    "zoom": 5,
    "aliases": [
      "QC"
    ]
  },
  {
    "id": "british-columbia-canada",
    "name": "British Columbia",
    "category": "Province",
    "adminRegion": "British Columbia",
    "country": "Canada",
    "bounds": {
      "west": -139.1,
      "south": 48.3,
      "east": -114.0,
      "north": 60.0
    },
    "center": [
      53.7,
      -127.6
    ],
    "zoom": 5,
    "aliases": [
      "BC"
    ]
  },
  {
    "id": "alberta-canada",
    "name": "Alberta",
    "category": "Province",
    "adminRegion": "Alberta",
    "country": "Canada",
    "bounds": {
      "west": -120.0,
      "south": 49.0,
      "east": -110.0,
      "north": 60.0
    },
    "center": [
      53.9,
      -116.5
    ],
    "zoom": 5,
    "aliases": [
      "AB"
    ]
  },
  {
    "id": "new-south-wales-australia",
    "name": "New South Wales",
    "category": "State",
    "adminRegion": "New South Wales",
    "country": "Australia",
    "bounds": {
      "west": 141.0,
      "south": -37.5,
      "east": 153.6,
      "north": -28.2
    },
    "center": [
      -31.8,
      145.6
    ],
    "zoom": 6,
    "aliases": [
      "NSW"
    ]
  },
  {
    "id": "queensland-australia",
    "name": "Queensland",
    "category": "State",
    "adminRegion": "Queensland",
    "country": "Australia",
    "bounds": {
      "west": 138.0,
      "south": -29.2,
      "east": 153.6,
      "north": -10.0
    },
    "center": [
      -20.9,
      142.7
    ],
    "zoom": 5,
    "aliases": [
      "QLD"
    ]
  },
  {
    "id": "victoria-australia",
    "name": "Victoria",
    "category": "State",
    "adminRegion": "Victoria",
    "country": "Australia",
    "bounds": {
      "west": 140.9,
      "south": -39.2,
      "east": 149.9,
      "north": -34.0
    },
    "center": [
      -37.0,
      144.9
    ],
    "zoom": 6,
    "aliases": [
      "VIC"
    ]
  },
  {
    "id": "western-australia-australia",
    "name": "Western Australia",
    "category": "State",
    "adminRegion": "Western Australia",
    "country": "Australia",
    "bounds": {
      "west": 112.9,
      "south": -35.2,
      "east": 129.0,
      "north": -13.7
    },
    "center": [
      -25.0,
      122.0
    ],
    "zoom": 5,
    "aliases": [
      "WA Australia"
    ]
  },
  {
    "id": "south-australia-australia",
    "name": "South Australia",
    "category": "State",
    "adminRegion": "South Australia",
    "country": "Australia",
    "bounds": {
      "west": 129.0,
      "south": -38.1,
      "east": 141.0,
      "north": -26.0
    },
    "center": [
      -30.0,
      135.0
    ],
    "zoom": 5,
    "aliases": [
      "SA Australia"
    ]
  },
  {
    "id": "tasmania-australia",
    "name": "Tasmania",
    "category": "State",
    "adminRegion": "Tasmania",
    "country": "Australia",
    "bounds": {
      "west": 143.8,
      "south": -43.7,
      "east": 148.5,
      "north": -39.6
    },
    "center": [
      -42.0,
      146.5
    ],
    "zoom": 7,
    "aliases": [
      "TAS"
    ]
  },
  {
    "id": "northern-territory-australia",
    "name": "Northern Territory",
    "category": "State",
    "adminRegion": "Northern Territory",
    "country": "Australia",
    "bounds": {
      "west": 129.0,
      "south": -26.0,
      "east": 138.0,
      "north": -11.0
    },
    "center": [
      -19.5,
      133.5
    ],
    "zoom": 5,
    "aliases": [
      "NT Australia"
    ]
  },
  {
    "id": "amazonas-brazil",
    "name": "Amazonas",
    "category": "State",
    "adminRegion": "Amazonas",
    "country": "Brazil",
    "bounds": {
      "west": -73.8,
      "south": -9.8,
      "east": -56.1,
      "north": 2.2
    },
    "center": [
      -3.4,
      -65.8
    ],
    "zoom": 5,
    "aliases": [
      "AM Brazil"
    ]
  },
  {
    "id": "mato-grosso-brazil",
    "name": "Mato Grosso",
    "category": "State",
    "adminRegion": "Mato Grosso",
    "country": "Brazil",
    "bounds": {
      "west": -61.6,
      "south": -18.0,
      "east": -50.2,
      "north": -7.3
    },
    "center": [
      -12.6,
      -55.4
    ],
    "zoom": 5,
    "aliases": [
      "MT Brazil"
    ]
  },
  {
    "id": "par\u00e1-brazil",
    "name": "Par\u00e1",
    "category": "State",
    "adminRegion": "Par\u00e1",
    "country": "Brazil",
    "bounds": {
      "west": -58.9,
      "south": -9.8,
      "east": -46.0,
      "north": 2.6
    },
    "center": [
      -3.7,
      -52.4
    ],
    "zoom": 5,
    "aliases": [
      "Para"
    ]
  },
  {
    "id": "bahia-brazil",
    "name": "Bahia",
    "category": "State",
    "adminRegion": "Bahia",
    "country": "Brazil",
    "bounds": {
      "west": -46.6,
      "south": -18.3,
      "east": -37.3,
      "north": -8.5
    },
    "center": [
      -12.5,
      -41.7
    ],
    "zoom": 6,
    "aliases": [
      "BA Brazil"
    ]
  },
  {
    "id": "minas-gerais-brazil",
    "name": "Minas Gerais",
    "category": "State",
    "adminRegion": "Minas Gerais",
    "country": "Brazil",
    "bounds": {
      "west": -51.0,
      "south": -22.9,
      "east": -39.8,
      "north": -14.2
    },
    "center": [
      -18.5,
      -44.5
    ],
    "zoom": 6,
    "aliases": [
      "MG Brazil"
    ]
  },
  {
    "id": "amazon-rainforest-region",
    "name": "Amazon Rainforest",
    "category": "Region",
    "country": "South America",
    "bounds": {
      "west": -74.0,
      "south": -15.0,
      "east": -48.0,
      "north": 5.0
    },
    "center": [
      -3.5,
      -60.0
    ],
    "zoom": 4,
    "aliases": [
      "Amazonia",
      "Amazon Basin"
    ]
  },
  {
    "id": "pantanal-region",
    "name": "Pantanal",
    "category": "Region",
    "country": "South America",
    "bounds": {
      "west": -58.5,
      "south": -22.0,
      "east": -55.0,
      "north": -16.0
    },
    "center": [
      -19.0,
      -56.5
    ],
    "zoom": 6,
    "aliases": [
      "Pantanal Wetlands"
    ]
  },
  {
    "id": "cerrado-region",
    "name": "Cerrado",
    "category": "Region",
    "country": "South America",
    "bounds": {
      "west": -60.0,
      "south": -24.0,
      "east": -42.0,
      "north": -4.0
    },
    "center": [
      -14.0,
      -50.0
    ],
    "zoom": 5,
    "aliases": [
      "Brazilian Savanna"
    ]
  },
  {
    "id": "gran-chaco-region",
    "name": "Gran Chaco",
    "category": "Region",
    "country": "South America",
    "bounds": {
      "west": -64.0,
      "south": -30.0,
      "east": -57.0,
      "north": -18.0
    },
    "center": [
      -24.0,
      -60.5
    ],
    "zoom": 5,
    "aliases": [
      "Chaco"
    ]
  },
  {
    "id": "siberian-taiga-region",
    "name": "Siberian Taiga",
    "category": "Region",
    "country": "Russia",
    "bounds": {
      "west": 60.0,
      "south": 52.0,
      "east": 140.0,
      "north": 72.0
    },
    "center": [
      60.0,
      100.0
    ],
    "zoom": 3,
    "aliases": [
      "Siberia",
      "Boreal Forest"
    ]
  },
  {
    "id": "congo-basin-region",
    "name": "Congo Basin",
    "category": "Region",
    "country": "Africa",
    "bounds": {
      "west": 12.0,
      "south": -6.0,
      "east": 30.0,
      "north": 6.0
    },
    "center": [
      0.0,
      21.0
    ],
    "zoom": 5,
    "aliases": [
      "Congo Rainforest"
    ]
  },
  {
    "id": "california-central-valley-region",
    "name": "California Central Valley",
    "category": "Region",
    "country": "United States",
    "bounds": {
      "west": -122.5,
      "south": 35.0,
      "east": -118.8,
      "north": 40.5
    },
    "center": [
      37.5,
      -120.5
    ],
    "zoom": 7,
    "aliases": [
      "Central Valley"
    ]
  },
  {
    "id": "mediterranean-basin-region",
    "name": "Mediterranean Basin",
    "category": "Region",
    "country": "Europe",
    "bounds": {
      "west": -10.0,
      "south": 30.0,
      "east": 36.0,
      "north": 46.0
    },
    "center": [
      38.0,
      15.0
    ],
    "zoom": 5,
    "aliases": [
      "Mediterranean"
    ]
  }
];
