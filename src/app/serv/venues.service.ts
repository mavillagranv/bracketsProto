import { EventEmitter, inject, Injectable } from '@angular/core';
import { Venues } from '../models/eventsModel';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  //private afs=inject(Firestore);
  $venues = new EventEmitter<Venues[]>()
  last$venues: Venues[] = [];
  constructor() {
    for (let i = 0; i < 30; i++) {
      this.last$venues.push(this.createVenue(i))
    }
  }
  loadAllVenues(compName: string) {
    this.$venues.emit(this.last$venues);
  }
  //Fake data
  gymNames = [
    'Hoop Dreams', 'Court Kings', 'Basketball Haven', 'Hoop City', 'Swish Central', 'Dunk Zone', 'Net Masters', 'Hoop House', 'Court Legends', 'Basketball Palace', 'Hoop Arena', 'Swish Court', 'Dunk Arena', 'Net Haven', 'Hoop Central', 'Court House', 'Basketball Zone', 'Hoop Legends', 'Swish Palace', 'Dunk Central', 'Net Arena', 'Hoop Haven', 'Court Central', 'Basketball Arena', 'Hoop Zone', 'Swish Legends', 'Dunk Palace', 'Net Central', 'Hoop Masters', 'Court Dreams'
  ];
  addresses = [
    '123 Elm St, Houston, TX 77001', '456 Oak St, Dallas, TX 75201', '789 Pine St, Austin, TX 73301', '101 Maple St, San Antonio, TX 78201', '202 Birch St, Fort Worth, TX 76101', '303 Cedar St, El Paso, TX 79901', '404 Spruce St, Arlington, TX 76001', '505 Willow St, Corpus Christi, TX 78401', '606 Ash St, Plano, TX 75001', '707 Poplar St, Laredo, TX 78040', '808 Cypress St, Lubbock, TX 79401', '909 Redwood St, Garland, TX 75040', '1010 Fir St, Irving, TX 75014', '1111 Palm St, Amarillo, TX 79101', '1212 Walnut St, Grand Prairie, TX 75050', '1313 Chestnut St, Brownsville, TX 78520', '1414 Hickory St, Pasadena, TX 77501', '1515 Magnolia St, McKinney, TX 75069', '1616 Dogwood St, Mesquite, TX 75149', '1717 Sycamore St, Killeen, TX 76540', '1818 Juniper St, Frisco, TX 75033', '1919 Alder St, McAllen, TX 78501', '2020 Hawthorn St, Waco, TX 76701', '2121 Sequoia St, Carrollton, TX 75006', '2222 Aspen St, Midland, TX 79701', '2323 Beech St, Denton, TX 76201', '2424 Cherry St, Abilene, TX 79601', '2525 Maple St, Odessa, TX 79760', '2626 Pine St, Round Rock, TX 78664', '2727 Elm St, Wichita Falls, TX 76301', '2828 Oak St, Richardson, TX 75080', '2929 Cedar St, Lewisville, TX 75057', '3030 Spruce St, Tyler, TX 75701', '3131 Willow St, Pearland, TX 77581', '3232 Ash St, College Station, TX 77840', '3333 Poplar St, San Angelo, TX 76901', '3434 Cypress St, Allen, TX 75002', '3535 Redwood St, League City, TX 77573', '3636 Fir St, Sugar Land, TX 77478', '3737 Palm St, Longview, TX 75601', '3838 Walnut St, Edinburg, TX 78539', '3939 Chestnut St, Mission, TX 78572', '4040 Hickory St, Bryan, TX 77801', '4141 Magnolia St, Baytown, TX 77520', '4242 Dogwood St, Pharr, TX 78577', '4343 Sycamore St, Missouri City, TX 77459', '4444 Juniper St, Temple, TX 76501', '4545 Alder St, Flower Mound, TX 75022', '4646 Hawthorn St, Harlingen, TX 78550'
  ];
venuePhotos=[
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9564ZbYri35SWHxfC3_8nCMVkijTnYXM-Q&s',
  'https://media.istockphoto.com/id/466336640/photo/basketball-arena.jpg?s=612x612&w=0&k=20&c=danGq0S3VD4-Eh2RY39YsMFTpn2saw_7YRgpS157Q1M=',
  'https://thumbs.dreamstime.com/b/basketball-court-ball-motion-stadium-lights-323699473.jpg',
  'https://media.gettyimages.com/id/467743832/es/foto/basketball-arena.jpg?s=612x612&w=gi&k=20&c=N2dvAJDA7ECGb9HNFOWbcs9Anqh8M7VvD-hz1ex-gdI=',
  'https://static.vecteezy.com/system/resources/previews/036/196/084/non_2x/ai-generated-basketball-hoop-in-a-large-hall-at-night-3d-rendering-ai-generated-free-photo.jpg',
  'https://www.shutterstock.com/image-illustration/empty-basketball-arena-perfectly-placed-600nw-2476620517.jpg',
  'https://thumbs.dreamstime.com/b/dynamic-basketball-court-ball-motion-under-stadium-lights-night-vibrant-glows-as-rolls-across-polished-surface-340533547.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nBI-XYBUP6mR4i5ph9npaESW97B3tcj1Ss2MItD10FhRBy7jvl_74bT2KWXE6k9zypw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIVEL8AvQOq3NO09RSaW5ZIm9gff7AJp8at-Jq0Vmq8OcHgqYliJTTjUhhkFFDDlJYq2Y&usqp=CAU',
  'https://static.vecteezy.com/system/resources/previews/033/124/235/non_2x/basketball-arena-large-sports-stadium-ai-generated-image-photo.jpg',
]
  createVenue(index: number, i = index + 1): Venues {
    let newVenue: Venues = {
      venueId: `fVenue-${('000' + i).slice(-3)}`,
      venueName: this.gymNames[index % this.gymNames.length],
      venueAddress: this.addresses[index % this.addresses.length],
      ZIPCode: this.addresses[index % this.addresses.length].split(', ')[2].split(' ')[1],
      venueCity: this.addresses[index % this.addresses.length].split(', ')[1],
      venueState: 'Texas',
      venueStateAbb: 'TX',
      venuePhoto: this.venuePhotos[Math.floor(Math.random() * this.venuePhotos.length)]
    }
    return newVenue;
  }

}
