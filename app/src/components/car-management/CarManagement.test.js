import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CarManagement } from 'components/car-management/CarManagement';

const mockUseAxios = jest.fn();
jest.mock('hooks/useAxios', () => ({
  useAxios: (url) => mockUseAxios(url)
}));
global.open = jest.fn();

describe('CarManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAxios.mockImplementation(() => {
      return {
        data: [
          {
            id: 2137,
            brand: 'Maserati',
            model: 'Spyder',
            year: 2012,
            fuelType: 'HYBRID',
            pricePerDay: 145.0,
            mileage: 155582,
            transmission: 'MANUAL',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
            registrationNumber: 'MZY106y',
            reservations: [
              {
                id: 7580,
                user: {
                  id: 224,
                  username: 'scopinl',
                  email: 'scopinl@bandcamp.com',
                  password: '$2a$10$pEyIByfsTZd/W1cTITScsuqgD8Nj8eHyb7oyXQQW1K/hdDCEjFxa6',
                  role: 'USER',
                  firstName: 'Slade',
                  lastName: 'Copin',
                  phone: '8343397925',
                  dateJoined: '2015-02-10T02:58:23.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2013-12-05T11:25:34.000+00:00',
                endDate: '2013-12-13T11:25:34.000+00:00',
                status: 'COMPLETED',
                totalPrice: 1158.8
              },
              {
                id: 7936,
                user: {
                  id: 259,
                  username: 'lvanyushkin1k',
                  email: 'lvanyushkin1k@opera.com',
                  password: '$2a$10$dl4dCDqw6aBnl/mdJPoIYuqpBy.NlTGWBhrIqDyojEzbidSTi412K',
                  role: 'USER',
                  firstName: 'Lynelle',
                  lastName: 'Vanyushkin',
                  phone: '9576218872',
                  dateJoined: '2014-09-13T23:21:50.000+00:00',
                  loyaltyPoints: 164
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2022-10-22T16:46:34.000+00:00',
                endDate: '2022-11-15T16:46:34.000+00:00',
                status: 'COMPLETED',
                totalPrice: 3476.4
              },
              {
                id: 8040,
                user: {
                  id: 217,
                  username: 'pdevonshiree',
                  email: 'pdevonshiree@is.gd',
                  password: '$2a$10$bib6pp5LgYeFIho2WxE3d.hDxJJuRzCrj0eXXEZHUnApwlXEXF88G',
                  role: 'USER',
                  firstName: 'Phaidra',
                  lastName: 'Devonshire',
                  phone: '4779028533',
                  dateJoined: '2009-05-19T00:52:26.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2021-08-13T23:25:53.000+00:00',
                endDate: '2021-08-17T23:25:53.000+00:00',
                status: 'COMPLETED',
                totalPrice: 579.4
              },
              {
                id: 8178,
                user: {
                  id: 263,
                  username: 'arafferty1o',
                  email: 'arafferty1o@g.co',
                  password: '$2a$10$7FBFViFU3LC5vQx3Bz5utODm/Pbt7Bx8k1Pb0JVIM/QeLXEk966kO',
                  role: 'USER',
                  firstName: 'Anatol',
                  lastName: 'Rafferty',
                  phone: '5997749428',
                  dateJoined: '2004-03-16T15:35:49.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2013-09-29T21:27:55.000+00:00',
                endDate: '2013-10-18T21:27:55.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2752.15
              },
              {
                id: 8049,
                user: {
                  id: 218,
                  username: 'jbrickellf',
                  email: 'jbrickellf@ebay.com',
                  password: '$2a$10$ixG7KquI/X2TIYUIEpoXsO8BXz3oMVV.mnB5HgsRsHuTWds25jHou',
                  role: 'USER',
                  firstName: 'Jermaine',
                  lastName: 'Brickell',
                  phone: '2461871079',
                  dateJoined: '2002-01-06T15:31:09.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2024-08-19T00:23:17.000+00:00',
                endDate: '2024-09-13T00:23:17.000+00:00',
                status: 'COMPLETED',
                totalPrice: 3621.25
              },
              {
                id: 8064,
                user: {
                  id: 204,
                  username: 'edanilenko1',
                  email: 'edanilenko1@army.mil',
                  password: '$2a$10$s235I5qnetQXSIzlqWo3nO0XhiprneP6NtB5BKzONMANdAVBHW76.',
                  role: 'USER',
                  firstName: 'Even',
                  lastName: 'Danilenko',
                  phone: '1952873722',
                  dateJoined: '2012-11-08T23:03:01.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2020-11-23T06:59:19.000+00:00',
                endDate: '2020-12-23T06:59:19.000+00:00',
                status: 'COMPLETED',
                totalPrice: 4345.5
              },
              {
                id: 8080,
                user: {
                  id: 251,
                  username: 'mclayfield1c',
                  email: 'mclayfield1c@sitemeter.com',
                  password: '$2a$10$y5CdhmraSI/jduXVCwpqfu/Gg8l6AD.oVEYjPqCDW4YgD3R7D/tMu',
                  role: 'USER',
                  firstName: 'Miles',
                  lastName: 'Clayfield',
                  phone: '1631419314',
                  dateJoined: '2004-03-29T14:32:41.000+00:00',
                  loyaltyPoints: 14
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2019-11-26T08:55:21.000+00:00',
                endDate: '2019-12-10T08:55:21.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2027.9
              },
              {
                id: 7669,
                user: {
                  id: 259,
                  username: 'lvanyushkin1k',
                  email: 'lvanyushkin1k@opera.com',
                  password: '$2a$10$dl4dCDqw6aBnl/mdJPoIYuqpBy.NlTGWBhrIqDyojEzbidSTi412K',
                  role: 'USER',
                  firstName: 'Lynelle',
                  lastName: 'Vanyushkin',
                  phone: '9576218872',
                  dateJoined: '2014-09-13T23:21:50.000+00:00',
                  loyaltyPoints: 164
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2017-09-28T01:13:39.000+00:00',
                endDate: '2017-10-17T01:13:39.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2752.15
              },
              {
                id: 7673,
                user: {
                  id: 273,
                  username: 'jpleasants1y',
                  email: 'jpleasants1y@furl.net',
                  password: '$2a$10$Czme/zBq07JivV1PGbFXh.PCGDK3dXaU5IXTeoBAjlD4C8PHCLrQW',
                  role: 'USER',
                  firstName: 'Jasun',
                  lastName: 'Pleasants',
                  phone: '3889347447',
                  dateJoined: '2011-12-27T04:39:43.000+00:00',
                  loyaltyPoints: 63
                },
                car: {
                  id: 4452,
                  brand: 'Maserati',
                  model: 'Spyder',
                  year: 2012,
                  fuelType: 'HYBRID',
                  pricePerDay: 145.0,
                  mileage: 155582,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Maserati_Coup%C3%A9_1X7A2558.jpg/270px-Maserati_Coup%C3%A9_1X7A2558.jpg',
                  registrationNumber: 'MZY106y'
                },
                startDate: '2016-06-26T07:08:28.000+00:00',
                endDate: '2016-07-14T07:08:28.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2607.3
              }
            ]
          },
          {
            id: 4453,
            brand: 'Suzuki',
            model: 'XL7',
            year: 1991,
            fuelType: 'HYBRID',
            pricePerDay: 160.0,
            mileage: 15519,
            transmission: 'AUTOMATIC',
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
            registrationNumber: 'XJU037h',
            reservations: [
              {
                id: 7677,
                user: {
                  id: 217,
                  username: 'pdevonshiree',
                  email: 'pdevonshiree@is.gd',
                  password: '$2a$10$bib6pp5LgYeFIho2WxE3d.hDxJJuRzCrj0eXXEZHUnApwlXEXF88G',
                  role: 'USER',
                  firstName: 'Phaidra',
                  lastName: 'Devonshire',
                  phone: '4779028533',
                  dateJoined: '2009-05-19T00:52:26.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2023-02-02T13:47:09.000+00:00',
                endDate: '2023-03-01T13:47:09.000+00:00',
                status: 'COMPLETED',
                totalPrice: 4321.62
              },
              {
                id: 7791,
                user: {
                  id: 277,
                  username: 'amarchent22',
                  email: 'amarchent22@csmonitor.com',
                  password: '$2a$10$CVcGYHlh5wfnsi7NM5Hw.OAZilg2IEsZVrjKb036grY/02WTexcIG',
                  role: 'USER',
                  firstName: 'Abrahan',
                  lastName: 'Marchent',
                  phone: '9163968027',
                  dateJoined: '2013-02-02T01:30:17.000+00:00',
                  loyaltyPoints: 20
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2022-08-28T14:32:35.000+00:00',
                endDate: '2022-09-03T14:32:35.000+00:00',
                status: 'COMPLETED',
                totalPrice: 960.36
              },
              {
                id: 7495,
                user: {
                  id: 247,
                  username: 'tambler18',
                  email: 'tambler18@pbs.org',
                  password: '$2a$10$3121caojLssiAUNeU7hJAeAGHo55H1120dv36I1hWbPdD5QQGiu.i',
                  role: 'USER',
                  firstName: 'Thacher',
                  lastName: 'Ambler',
                  phone: '1825633033',
                  dateJoined: '2006-11-15T11:17:33.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2017-03-09T04:33:49.000+00:00',
                endDate: '2017-03-23T04:33:49.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2240.84
              },
              {
                id: 7767,
                user: {
                  id: 210,
                  username: 'hbateman7',
                  email: 'hbateman7@nature.com',
                  password: '$2a$10$6wzG3FensaxGr/v.RwTkGOX58mBvCFwgJiC3Jywac6HM8PM5.NIQ.',
                  role: 'USER',
                  firstName: 'Horatius',
                  lastName: 'Bateman',
                  phone: '7072622582',
                  dateJoined: '2024-04-02T22:48:59.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2017-10-10T05:28:58.000+00:00',
                endDate: '2017-10-29T05:28:58.000+00:00',
                status: 'COMPLETED',
                totalPrice: 3041.14
              },
              {
                id: 7928,
                user: {
                  id: 282,
                  username: 'acust27',
                  email: 'acust27@berkeley.edu',
                  password: '$2a$10$0fY.2pGlgXTGNHPjIvucve7KHGIpJD3iguhyYBk/eCQJmeUk8i8CK',
                  role: 'USER',
                  firstName: 'Averil',
                  lastName: 'Cust',
                  phone: '3888749807',
                  dateJoined: '2016-09-09T19:07:01.000+00:00',
                  loyaltyPoints: 237
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2020-04-17T18:40:00.000+00:00',
                endDate: '2020-04-21T18:40:00.000+00:00',
                status: 'COMPLETED',
                totalPrice: 640.24
              },
              {
                id: 7737,
                user: {
                  id: 220,
                  username: 'nvelasquezh',
                  email: 'nvelasquezh@biglobe.ne.jp',
                  password: '$2a$10$s6gIpea.vYCNvfslwZ0jL.fn8FCvaJz5zS34NbSjUXbSjaXjZ4g.S',
                  role: 'USER',
                  firstName: 'Noell',
                  lastName: 'Velasquez',
                  phone: '6635925603',
                  dateJoined: '2011-04-03T14:49:10.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2015-08-14T19:25:50.000+00:00',
                endDate: '2015-08-27T19:25:50.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2080.78
              },
              {
                id: 7956,
                user: {
                  id: 275,
                  username: 'olesurf20',
                  email: 'olesurf20@ihg.com',
                  password: '$2a$10$KwwIAXN6bYOnaYe/LlP1d.kOpX6tRlJfEilMnzIPdc6pF7zKME8UW',
                  role: 'USER',
                  firstName: 'Odille',
                  lastName: 'Lesurf',
                  phone: '7362423203',
                  dateJoined: '2021-01-24T13:33:50.000+00:00',
                  loyaltyPoints: 72
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2019-07-21T00:33:48.000+00:00',
                endDate: '2019-08-20T00:33:48.000+00:00',
                status: 'COMPLETED',
                totalPrice: 4801.8
              },
              {
                id: 8042,
                user: {
                  id: 252,
                  username: 'benston1d',
                  email: 'benston1d@eepurl.com',
                  password: '$2a$10$DZhOtRUY/4L6RK.ucXXTR..NFSqH.6Y2lCoHvKtWq8jL8akPR0ojC',
                  role: 'USER',
                  firstName: 'Barrett',
                  lastName: 'Enston',
                  phone: '8304238971',
                  dateJoined: '2007-01-25T16:39:15.000+00:00',
                  loyaltyPoints: 0
                },
                car: {
                  id: 4453,
                  brand: 'Suzuki',
                  model: 'XL7',
                  year: 1991,
                  fuelType: 'HYBRID',
                  pricePerDay: 160.0,
                  mileage: 15519,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg/305px-2013_Suzuki_Ertiga_1.4_GX_wagon_%28ZE81S%3B_01-20-2019%29%2C_South_Tangerang.jpg',
                  registrationNumber: 'XJU037h'
                },
                startDate: '2014-02-24T05:42:26.000+00:00',
                endDate: '2014-03-25T05:42:26.000+00:00',
                status: 'COMPLETED',
                totalPrice: 4641.74
              }
            ]
          }
        ]
      };
    });
  });

  it('should render table with cars data', () => {
    render(<CarManagement />);

    expect(screen.getByText(/Maserati/i)).toBeInTheDocument();
    expect(screen.getByText(/Suzuki/i)).toBeInTheDocument();
  });

  it('should filter cars', () => {
    render(<CarManagement />);

    fireEvent.change(screen.getByLabelText('Wyszukaj'), { target: { value: 'Maserati' } });

    expect(screen.getByText(/Maserati/i)).toBeInTheDocument();
    expect(screen.queryByText(/Suzuki/i)).not.toBeInTheDocument();
  });

  it('should open selected car profile in new tab', async () => {
    render(<CarManagement />);

    fireEvent.change(screen.getByLabelText('Wyszukaj'), { target: { value: 'Maserati' } });

    fireEvent.click(screen.getByRole('button', { name: /info/i }));

    await waitFor(() => {
      expect(global.open).toHaveBeenCalledWith('/car-details/2137', '_blank');
    });
  });
});
