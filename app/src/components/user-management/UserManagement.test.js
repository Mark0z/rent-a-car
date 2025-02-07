import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserManagement } from 'components/user-management/UserManagement';

const mockUseAxios = jest.fn();
jest.mock('hooks/useAxios', () => ({
  useAxios: (url) => mockUseAxios(url)
}));
global.open = jest.fn();

describe('UserManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAxios.mockImplementation(() => {
      return {
        data: [
          {
            id: 2137,
            username: 'testuser1',
            email: 'ihillabyp@ted.com',
            password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
            role: 'USER',
            firstName: 'Ileane',
            lastName: 'Hillaby',
            phone: '5934119283',
            dateJoined: '2008-01-09T02:29:56.000+00:00',
            loyaltyPoints: 131,
            reservations: [
              {
                id: 7425,
                user: {
                  id: 228,
                  username: 'ihillabyp',
                  email: 'ihillabyp@ted.com',
                  password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
                  role: 'USER',
                  firstName: 'Ileane',
                  lastName: 'Hillaby',
                  phone: '5934119283',
                  dateJoined: '2008-01-09T02:29:56.000+00:00',
                  loyaltyPoints: 131
                },
                car: {
                  id: 4474,
                  brand: 'Lincoln',
                  model: 'LS',
                  year: 1998,
                  fuelType: 'DIESEL',
                  pricePerDay: 296.0,
                  mileage: 84155,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/00-02_Lincoln_LS_2.jpg/341px-00-02_Lincoln_LS_2.jpg',
                  registrationNumber: 'SDR410n'
                },
                startDate: '2014-04-30T22:37:26.000+00:00',
                endDate: '2014-05-10T22:37:26.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2963.0
              },
              {
                id: 7533,
                user: {
                  id: 228,
                  username: 'ihillabyp',
                  email: 'ihillabyp@ted.com',
                  password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
                  role: 'USER',
                  firstName: 'Ileane',
                  lastName: 'Hillaby',
                  phone: '5934119283',
                  dateJoined: '2008-01-09T02:29:56.000+00:00',
                  loyaltyPoints: 131
                },
                car: {
                  id: 4503,
                  brand: 'Honda',
                  model: 'Accord',
                  year: 2013,
                  fuelType: 'PETROL',
                  pricePerDay: 158.0,
                  mileage: 148470,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Honda_Accord_1993_Finland.JPG/270px-Honda_Accord_1993_Finland.JPG',
                  registrationNumber: 'QUW1377'
                },
                startDate: '2019-10-19T15:42:48.000+00:00',
                endDate: '2019-11-05T15:42:48.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2684.64
              },
              {
                id: 8215,
                user: {
                  id: 228,
                  username: 'ihillabyp',
                  email: 'ihillabyp@ted.com',
                  password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
                  role: 'USER',
                  firstName: 'Ileane',
                  lastName: 'Hillaby',
                  phone: '5934119283',
                  dateJoined: '2008-01-09T02:29:56.000+00:00',
                  loyaltyPoints: 131
                },
                car: {
                  id: 4498,
                  brand: 'Audi',
                  model: 'S5',
                  year: 2017,
                  fuelType: 'HYBRID',
                  pricePerDay: 343.0,
                  mileage: 135590,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Red_Audi_S5_Sportback_IAA_2009.JPG/270px-Red_Audi_S5_Sportback_IAA_2009.JPG',
                  registrationNumber: 'ZHB915l'
                },
                startDate: '2021-03-04T17:51:43.000+00:00',
                endDate: '2021-03-21T17:51:43.000+00:00',
                status: 'COMPLETED',
                totalPrice: 5825.39
              },
              {
                id: 7822,
                user: {
                  id: 228,
                  username: 'ihillabyp',
                  email: 'ihillabyp@ted.com',
                  password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
                  role: 'USER',
                  firstName: 'Ileane',
                  lastName: 'Hillaby',
                  phone: '5934119283',
                  dateJoined: '2008-01-09T02:29:56.000+00:00',
                  loyaltyPoints: 131
                },
                car: {
                  id: 4480,
                  brand: 'Mercedes-Benz',
                  model: 'S-Class',
                  year: 2007,
                  fuelType: 'HYBRID',
                  pricePerDay: 179.0,
                  mileage: 169291,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/M%C3%BCnster%2C_Beresa%2C_Mercedes-Benz_C-Klasse_Cabrio_--_2018_--_1757.jpg/270px-M%C3%BCnster%2C_Beresa%2C_Mercedes-Benz_C-Klasse_Cabrio_--_2018_--_1757.jpg',
                  registrationNumber: 'XUH474o'
                },
                startDate: '2020-04-30T13:03:17.000+00:00',
                endDate: '2020-05-20T13:03:17.000+00:00',
                status: 'COMPLETED',
                totalPrice: 3571.4
              },
              {
                id: 7842,
                user: {
                  id: 228,
                  username: 'ihillabyp',
                  email: 'ihillabyp@ted.com',
                  password: '$2a$10$99P0PvfOyW6gmGSkTtAzD.oUNe.99.pGIWYtgn161aUSQVHlgZ1Ka',
                  role: 'USER',
                  firstName: 'Ileane',
                  lastName: 'Hillaby',
                  phone: '5934119283',
                  dateJoined: '2008-01-09T02:29:56.000+00:00',
                  loyaltyPoints: 131
                },
                car: {
                  id: 4455,
                  brand: 'Porsche',
                  model: '928',
                  year: 2006,
                  fuelType: 'PETROL',
                  pricePerDay: 117.0,
                  mileage: 83387,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Porsche_928_Classic-Days_2022_DSC_0022.jpg/271px-Porsche_928_Classic-Days_2022_DSC_0022.jpg',
                  registrationNumber: 'TSY981u'
                },
                startDate: '2021-01-21T18:58:48.000+00:00',
                endDate: '2021-01-29T18:58:48.000+00:00',
                status: 'COMPLETED',
                totalPrice: 935.12
              }
            ]
          },
          {
            id: 352,
            username: 'testuser2',
            email: 'sentres0@de.vu',
            password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
            role: 'USER',
            firstName: 'Shelden',
            lastName: 'Entres',
            phone: '3783760122',
            dateJoined: '2016-06-23T09:47:34.000+00:00',
            loyaltyPoints: 228,
            reservations: [
              {
                id: 211,
                username: 'ccoale8',
                email: 'ccoale8@spotify.com',
                password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                role: 'USER',
                firstName: 'Carine',
                lastName: 'Coale',
                phone: '9791476007',
                dateJoined: '2015-03-27T16:22:20.000+00:00',
                loyaltyPoints: 0,
                reservations: [
                  {
                    id: 7252,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4462,
                      brand: 'Chevrolet',
                      model: 'TrailBlazer',
                      year: 1992,
                      fuelType: 'PETROL',
                      pricePerDay: 282.0,
                      mileage: 65038,
                      transmission: 'MANUAL',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chevrolet_TrailBlazer_--_06-05-2010.jpg/310px-Chevrolet_TrailBlazer_--_06-05-2010.jpg',
                      registrationNumber: 'XSH520t'
                    },
                    startDate: '2018-07-25T11:35:48.000+00:00',
                    endDate: '2018-08-24T11:35:48.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 8449.5
                  },
                  {
                    id: 7409,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4471,
                      brand: 'BMW',
                      model: '5 Series',
                      year: 1985,
                      fuelType: 'HYBRID',
                      pricePerDay: 210.0,
                      mileage: 28039,
                      transmission: 'MANUAL',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BPol_BMW_F11%2C_Hamburg-Altona_%28155914%29.jpg/269px-BPol_BMW_F11%2C_Hamburg-Altona_%28155914%29.jpg',
                      registrationNumber: 'GHT636d'
                    },
                    startDate: '2024-06-07T10:38:11.000+00:00',
                    endDate: '2024-06-11T10:38:11.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 839.88
                  },
                  {
                    id: 7763,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4524,
                      brand: 'Volvo',
                      model: 'C70',
                      year: 2009,
                      fuelType: 'HYBRID',
                      pricePerDay: 219.0,
                      mileage: 40784,
                      transmission: 'AUTOMATIC',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/VOLVO_C70_M_China.jpg/375px-VOLVO_C70_M_China.jpg',
                      registrationNumber: 'XAR646n'
                    },
                    startDate: '2014-07-09T17:01:28.000+00:00',
                    endDate: '2014-07-14T17:01:28.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 1095.35
                  },
                  {
                    id: 7883,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4533,
                      brand: 'Volkswagen',
                      model: 'rio',
                      year: 2005,
                      fuelType: 'PETROL',
                      pricePerDay: 298.0,
                      mileage: 9817,
                      transmission: 'AUTOMATIC',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pol%C3%ADcia_Civil_-_Rio_de_Janeiro_-_viatura_de_1987_%284924929523%29.jpg/250px-Pol%C3%ADcia_Civil_-_Rio_de_Janeiro_-_viatura_de_1987_%284924929523%29.jpg',
                      registrationNumber: 'ZOH974w'
                    },
                    startDate: '2020-03-26T19:09:25.000+00:00',
                    endDate: '2020-04-06T19:09:25.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 3273.82
                  },
                  {
                    id: 7457,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4533,
                      brand: 'Volkswagen',
                      model: 'rio',
                      year: 2005,
                      fuelType: 'PETROL',
                      pricePerDay: 298.0,
                      mileage: 9817,
                      transmission: 'AUTOMATIC',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Pol%C3%ADcia_Civil_-_Rio_de_Janeiro_-_viatura_de_1987_%284924929523%29.jpg/250px-Pol%C3%ADcia_Civil_-_Rio_de_Janeiro_-_viatura_de_1987_%284924929523%29.jpg',
                      registrationNumber: 'ZOH974w'
                    },
                    startDate: '2015-03-05T13:18:48.000+00:00',
                    endDate: '2015-04-04T13:18:48.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 8928.6
                  },
                  {
                    id: 7863,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4528,
                      brand: 'Chrysler',
                      model: 'Concorde',
                      year: 1989,
                      fuelType: 'HYBRID',
                      pricePerDay: 119.0,
                      mileage: 57620,
                      transmission: 'MANUAL',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/2002-04_Chrysler-Concorde.jpg/378px-2002-04_Chrysler-Concorde.jpg',
                      registrationNumber: 'DMO040x'
                    },
                    startDate: '2021-07-21T05:03:44.000+00:00',
                    endDate: '2021-08-02T05:03:44.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 1427.88
                  },
                  {
                    id: 7793,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4498,
                      brand: 'Audi',
                      model: 'S5',
                      year: 2017,
                      fuelType: 'HYBRID',
                      pricePerDay: 343.0,
                      mileage: 135590,
                      transmission: 'AUTOMATIC',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Red_Audi_S5_Sportback_IAA_2009.JPG/270px-Red_Audi_S5_Sportback_IAA_2009.JPG',
                      registrationNumber: 'ZHB915l'
                    },
                    startDate: '2023-02-04T12:38:55.000+00:00',
                    endDate: '2023-02-10T12:38:55.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 2056.02
                  },
                  {
                    id: 8113,
                    user: {
                      id: 211,
                      username: 'ccoale8',
                      email: 'ccoale8@spotify.com',
                      password: '$2a$10$w/FlvLgtjor9bEHNLZAh9.WegUplQQMIxKMQEwPBzTi0T73zXXgxy',
                      role: 'USER',
                      firstName: 'Carine',
                      lastName: 'Coale',
                      phone: '9791476007',
                      dateJoined: '2015-03-27T16:22:20.000+00:00',
                      loyaltyPoints: 0
                    },
                    car: {
                      id: 4542,
                      brand: 'Dodge',
                      model: 'Colt',
                      year: 2014,
                      fuelType: 'HYBRID',
                      pricePerDay: 207.0,
                      mileage: 179752,
                      transmission: 'MANUAL',
                      imageUrl:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/%2793-%2794_Dodge_Colt_Coupe.JPG/252px-%2793-%2794_Dodge_Colt_Coupe.JPG',
                      registrationNumber: 'BRD594f'
                    },
                    startDate: '2021-02-25T19:31:38.000+00:00',
                    endDate: '2021-03-14T19:31:38.000+00:00',
                    status: 'COMPLETED',
                    totalPrice: 3522.91
                  }
                ]
              },
              {
                id: 7813,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4464,
                  brand: 'Volkswagen',
                  model: 'R32',
                  year: 2006,
                  fuelType: 'HYBRID',
                  pricePerDay: 121.0,
                  mileage: 127803,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/VOLKSWAGEN_GOLF_R32_%28Mk5_A5%29_China.jpg/260px-VOLKSWAGEN_GOLF_R32_%28Mk5_A5%29_China.jpg',
                  registrationNumber: 'MGR9445'
                },
                startDate: '2024-03-05T22:39:35.000+00:00',
                endDate: '2024-03-16T22:39:35.000+00:00',
                status: 'COMPLETED',
                totalPrice: 1325.5
              },
              {
                id: 8261,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4510,
                  brand: 'Hyundai',
                  model: 'Accent',
                  year: 2018,
                  fuelType: 'PETROL',
                  pricePerDay: 226.0,
                  mileage: 101755,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/KIA_QIANLIMA_%28HYUNDAI_ACCENT_%28X3%29%29_China.jpg/319px-KIA_QIANLIMA_%28HYUNDAI_ACCENT_%28X3%29%29_China.jpg',
                  registrationNumber: 'LBJ853h'
                },
                startDate: '2024-10-19T17:37:24.000+00:00',
                endDate: '2024-11-10T17:37:24.000+00:00',
                status: 'COMPLETED',
                totalPrice: 4962.1
              },
              {
                id: 7472,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4481,
                  brand: 'Scion',
                  model: 'xB',
                  year: 2004,
                  fuelType: 'DIESEL',
                  pricePerDay: 113.0,
                  mileage: 32155,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/2008_Scion_xB.jpg/300px-2008_Scion_xB.jpg',
                  registrationNumber: 'UAU0321'
                },
                startDate: '2021-08-30T15:42:47.000+00:00',
                endDate: '2021-09-22T15:42:47.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2608.89
              },
              {
                id: 7909,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4548,
                  brand: 'BMW',
                  model: '5 Series',
                  year: 2009,
                  fuelType: 'PETROL',
                  pricePerDay: 279.0,
                  mileage: 154102,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BPol_BMW_F11%2C_Hamburg-Altona_%28155914%29.jpg/269px-BPol_BMW_F11%2C_Hamburg-Altona_%28155914%29.jpg',
                  registrationNumber: 'ASL884c'
                },
                startDate: '2023-11-04T03:01:51.000+00:00',
                endDate: '2023-11-28T03:01:51.000+00:00',
                status: 'COMPLETED',
                totalPrice: 6695.04
              },
              {
                id: 8003,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4527,
                  brand: 'Dodge',
                  model: 'Durango',
                  year: 2011,
                  fuelType: 'PETROL',
                  pricePerDay: 332.0,
                  mileage: 16254,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Dodge_Durango_SLT_V8_Magnum_bei_einem_Autoh%C3%A4ndler_im_Engadin_%282017%29.jpg/270px-Dodge_Durango_SLT_V8_Magnum_bei_einem_Autoh%C3%A4ndler_im_Engadin_%282017%29.jpg',
                  registrationNumber: 'BWL028i'
                },
                startDate: '2016-01-31T13:03:48.000+00:00',
                endDate: '2016-02-18T13:03:48.000+00:00',
                status: 'COMPLETED',
                totalPrice: 5973.3
              },
              {
                id: 8273,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4520,
                  brand: 'Scion',
                  model: 'tC',
                  year: 1997,
                  fuelType: 'HYBRID',
                  pricePerDay: 342.0,
                  mileage: 124565,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/CT2007SciontC.jpg/270px-CT2007SciontC.jpg',
                  registrationNumber: 'TMI557m'
                },
                startDate: '2024-11-12T12:00:36.000+00:00',
                endDate: '2024-12-01T12:00:36.000+00:00',
                status: 'COMPLETED',
                totalPrice: 6504.46
              },
              {
                id: 7684,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4475,
                  brand: 'Isuzu',
                  model: 'Amigo',
                  year: 2009,
                  fuelType: 'ELECTRIC',
                  pricePerDay: 273.0,
                  mileage: 19284,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Isuzu_Mu_003.JPG/330px-Isuzu_Mu_003.JPG',
                  registrationNumber: 'FRU861r'
                },
                startDate: '2015-05-30T06:27:38.000+00:00',
                endDate: '2015-06-19T06:27:38.000+00:00',
                status: 'COMPLETED',
                totalPrice: 5451.0
              },
              {
                id: 7370,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4505,
                  brand: 'Chevrolet',
                  model: 'S10',
                  year: 1985,
                  fuelType: 'PETROL',
                  pricePerDay: 181.0,
                  mileage: 149835,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/S10-Blazer-2door.jpg/344px-S10-Blazer-2door.jpg',
                  registrationNumber: 'KHK570g'
                },
                startDate: '2022-03-14T11:00:57.000+00:00',
                endDate: '2022-03-27T11:00:57.000+00:00',
                status: 'COMPLETED',
                totalPrice: 2358.72
              },
              {
                id: 7303,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4498,
                  brand: 'Audi',
                  model: 'S5',
                  year: 2017,
                  fuelType: 'HYBRID',
                  pricePerDay: 343.0,
                  mileage: 135590,
                  transmission: 'AUTOMATIC',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Red_Audi_S5_Sportback_IAA_2009.JPG/270px-Red_Audi_S5_Sportback_IAA_2009.JPG',
                  registrationNumber: 'ZHB915l'
                },
                startDate: '2020-02-04T09:45:34.000+00:00',
                endDate: '2020-02-20T09:45:34.000+00:00',
                status: 'COMPLETED',
                totalPrice: 5482.72
              },
              {
                id: 8108,
                user: {
                  id: 352,
                  username: 'sentres0',
                  email: 'sentres0@de.vu',
                  password: '$2a$10$5CxpegNyKRPxaVyM1CbeBe7vcrgjnMXSQoKReT3eL9LPhfA9NPHh.',
                  role: 'USER',
                  firstName: 'Shelden',
                  lastName: 'Entres',
                  phone: '3783760122',
                  dateJoined: '2016-06-23T09:47:34.000+00:00',
                  loyaltyPoints: 228
                },
                car: {
                  id: 4535,
                  brand: 'Ford',
                  model: 'Fusion',
                  year: 1985,
                  fuelType: 'DIESEL',
                  pricePerDay: 278.0,
                  mileage: 65355,
                  transmission: 'MANUAL',
                  imageUrl:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/2011_Ford_Fusion_SE.jpg/226px-2011_Ford_Fusion_SE.jpg',
                  registrationNumber: 'VED028t'
                },
                startDate: '2013-12-14T14:38:39.000+00:00',
                endDate: '2014-01-07T14:38:39.000+00:00',
                status: 'COMPLETED',
                totalPrice: 6681.36
              }
            ]
          }
        ]
      };
    });
  });

  it('should render table with users data', () => {
    render(<UserManagement />);

    expect(screen.getByText(/testuser1/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser2/i)).toBeInTheDocument();
  });

  it('should filter users', () => {
    render(<UserManagement />);

    fireEvent.change(screen.getByLabelText('Wyszukaj'), { target: { value: 'testuser1' } });

    expect(screen.getByText(/testuser1/i)).toBeInTheDocument();
    expect(screen.queryByText(/testuser2/i)).not.toBeInTheDocument();
  });

  it('should open selected user profile in new tab', async () => {
    render(<UserManagement />);

    fireEvent.change(screen.getByLabelText('Wyszukaj'), { target: { value: 'testuser1' } });

    fireEvent.click(screen.getByRole('button', { name: /info/i }));

    await waitFor(() => {
      expect(global.open).toHaveBeenCalledWith('/user-profile/2137', '_blank');
    });
  });
});
