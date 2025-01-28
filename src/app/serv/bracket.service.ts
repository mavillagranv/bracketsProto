import { EventEmitter, Injectable } from '@angular/core';
import { TeamUnit } from '../comp/models/teamModels';
import { EventModel } from '../comp/models/eventModel';

@Injectable({
  providedIn: 'root'
})
export class BracketService {
  $registeredTeams = new EventEmitter<any[]>();
  $intrestedTeams = new EventEmitter<any[]>();
  $event = new EventEmitter<EventModel>();
  last$event: EventModel = {
    //Contact
    contactMail: 'A@A.com',
    contactPhone: 12341234,
    contactFullName: 'Miguel Villagrán',
    //General
    active: true,
    eventLogo: 'https://firebasestorage.googleapis.com/v0/b/astrohoopz-6b201.appspot.com/o/eventLogos%2FTPnWouwg61Fv4xaR5m1L.png?alt=media&amp;token=01c30c7f-317e-422e-9aed-ef34a7b7ce5f',
    //organizationLogo?: string,
    eventIsOpen: true,
    userId: '1234',
    eventId: 'aaaaaa',
    //Info
    eventName: 'Evento chido',
    eventDescription: 'Este evento es de prueba',
    eventGeneralInfo: 'string sisisis',
    eventEntryFees: [
      {
        feeDesc: 'Pago 1',
        feeAmount: 1234
      }
    ],
    eventVenues: [
      {
        venueId: 'loala',
        venueName: 'Las canchas de a lado',
        venueAddress: 'Aquí',
        ZIPCode: '1234',
        venueCity: 'CDMX',
        venueState: 'Ciudad de México',
        venueStateAbb: 'CDMX',
      }
    ],
    eventDateStart: new Date(),
    eventDateEnd: new Date(),
    eventCategories: [
      {
        category: '6th grade',
        gender: 'Male',
        code: '6Male',
        closed: false
      },
      {
        category: '7th grade',
        gender: 'Female',
        code: '7Female',
        closed: false
      },
      {
        category: '7th grade',
        gender: 'Male',
        code: '7Male',
        closed: false
      }
    ],
    //Location
    eventCity: 'CDMX',
    eventState: 'Ciudad de México',
    eventStateAbb: 'CDMX',
    //Gender
    eventForMales: true,
    eventForFemales: false,
    eventMixed: false,
  }
  last$intrestedTeams: any[] = [{
    teamName: 'Mike team 1',
    teamId: '1234',
    teamUnitName: 'Varsity',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: []
  }]
  last$registeredTeams: any[] = [{
    teamName: 'Mike team 2',
    teamId: '2345',
    teamUnitName: 'VS',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: []
  }]

  constructor() { }
  loadTeamUnits() {
    this.$registeredTeams.emit(this.last$registeredTeams);
    this.$intrestedTeams.emit(this.last$intrestedTeams);
    this.$event.emit(this.last$event)
  }
}
