import { inject, Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { EventModel } from '../models/eventsModel';
import { TeamUnit } from '../models/teamsModels';
import { TeamCoach, UserM } from '../models/userModels';
import { VenuesService } from './venues.service';

@Injectable({
  providedIn: 'root'
})
export class BracketsService {
  servName = 'BracketsService';
  auditTimeValue = 300;
  dataLoad = {
    $intrestedTeamUnits: true,
    $registeredTeamUnits: true,
    $event: true,
    selectedEventDivision: '',
    poolsSelectedCount: 0,
    eventPublicId: ''
  }
  $intrestedTeamUnits = new EventEmitter<TeamUnit[]>();
  last$intrestedTeamUnits!: TeamUnit[];
  $registeredTeamUnits = new EventEmitter<TeamUnit[]>();
  last$registeredTeamUnits!: TeamUnit[];
  $event = new EventEmitter<EventModel>();
  //last$event!: EventModel;
  constructor(
    //private afs: AngularFirestore,
    //private errServ: ErrorService,
    //private rServ: ReadServiceService,
    //private notServ: NotificationsService
  ) {

  }
  reloadData() {
    !this.dataLoad.$intrestedTeamUnits ? this.$intrestedTeamUnits.emit(this.last$intrestedTeamUnits) : null;
    !this.dataLoad.$registeredTeamUnits ? this.$registeredTeamUnits.emit(this.last$registeredTeamUnits) : null;
    !this.dataLoad.$event ? this.$event.emit(this.last$event) : null;
  }

  /* 
  ╒	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ╤ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╕
  ┇                          Fake data                              ┇
  ╘	┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅ ┅	╛
  */
  private vServ = inject(VenuesService);
  fakeUsers: UserM[] = this.createFakeUsers();
  loadEvent(publicId: string) {
    console.log(publicId)
    this.$intrestedTeamUnits.emit(this.createRandomTeams(12))
    this.$registeredTeamUnits.emit(this.createRandomTeams(10))
    this.$event.emit(this.last$event);
  }
  createRandomTeams(count: number): any[] {
    const teams = [];
    for (let i = 0; i < count; i++) {
      teams.push({
        unitDivision: `Division ${i % 3}`,
        ownerId: `owner${i}`,
        priority: Math.floor(Math.random() * 10),
        teamLogoUrl: `http://example.com/logo${i}.png`,
        teamName: `Team ${i}`,
        teamAbbreviation: `T${i}`,
        timestamp: new Date(),
        teamId: `team${i}`,
        teamUnitId: `unit${i}`,
        teamUnitName: `Unit ${i}`,
        teamUnitManagersIds: [`manager${i}`],
        teamUnitManagers: this.createFakeUsers().slice(0, 2),
        participantIds: [`participant${i}`],
        teamUnitCoach: this.placeholderTeamCoach,
        teamUnitFlavor: 'default',
        teamUnitPlayers: this.createFakeUsers().slice(0, 5),
        divisionCode: `D${i % 3}`,
      });
    }
    return teams;
  }
  placeholderTeamCoach: TeamCoach = {
    profilePicture: 'someurl.com/image',
    userId: 'placeholderId',
    userFirstName: 'PlaceholderFirstName',
    userLastName: 'PlaceholderLastName',
    userMail: 'placeholder@example.com',
    contactEmail: 'placeholder@example.com',
    contactPhone: '1234567890',
    userIsCoach: true,
  };
  createFakeUsers(): UserM[] {
    let fakeUsers = [];
    for (let i = 0; i < 10; i++) {
      fakeUsers.push({
        eventOrganizer: Math.random() > 0.5,
        userCreated: new Date(),
        betaTester: Math.random() > 0.5,
        teamAdmin: Math.random() > 0.5,
        developer: Math.random() > 0.5,
        timestamp: new Date(),
        firstUpdate: Math.random() > 0.5,
        userIsAdmin: Math.random() > 0.5,
        isTeamAdministrator: Math.random() > 0.5,
        userDisplayName: `User ${i}`,
        userId: `user${i}`,
        userPhotoUrl: `http://example.com/user${i}.png`,
        userMail: `user${i}@example.com`,
        useGooglePhoto: Math.random() > 0.5,
        profilePicture: `http://example.com/profile${i}.png`,
        coverPicture: `http://example.com/cover${i}.png`,
        playerIsActive: Math.random() > 0.5,
        userIsParent: Math.random() > 0.5,
        userIsCoach: Math.random() > 0.5,
        userIsDeveloper: Math.random() > 0.5,
        userIsTeamAdministrator: Math.random() > 0.5,
        userFirstName: `FirstName${i}`,
        userLastName: `LastName${i}`,
        userUsername: `username${i}`,
        playerCity: `City${i}`,
        userInstagram: `instagram${i}`,
        userX: `x${i}`,
        userYoutube: `youtube${i}`,
        playerDOB: new Date(2000, i % 12, i % 28),
        playerClassOf: 2020 + i,
        playerHeight: `${150 + i} cm`,
        playerPosition: `Position${i}`,
        playerSchool: `School${i}`,
        coachSchool: `CoachSchool${i}`,
        userPaymentLinks: []
      });
    }
    return fakeUsers;
  }
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
      this.vServ.createVenue(1)
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
  last$intrestedTeams: TeamUnit[] = [{
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
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    },
  }
    , {
    teamName: 'Mike team 3',
    teamId: '3456',
    teamUnitName: 'JV',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    },
  }, {
    teamName: 'Mike team 4',
    teamId: '4567',
    teamUnitName: 'Freshman',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 5',
    teamId: '5678',
    teamUnitName: 'Sophomore',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 6',
    teamId: '6789',
    teamUnitName: 'Senior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 7',
    teamId: '7890',
    teamUnitName: 'Junior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 8',
    teamId: '8901',
    teamUnitName: 'Varsity',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 9',
    teamId: '9012',
    teamUnitName: 'JV',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 10',
    teamId: '0123',
    teamUnitName: 'Freshman',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 11',
    teamId: '1234',
    teamUnitName: 'Sophomore',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 12',
    teamId: '2345',
    teamUnitName: 'Senior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 13',
    teamId: '3456',
    teamUnitName: 'Junior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 14',
    teamId: '4567',
    teamUnitName: 'Varsity',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 15',
    teamId: '5678',
    teamUnitName: 'JV',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 16',
    teamId: '6789',
    teamUnitName: 'Freshman',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }]
  last$registeredTeams: any[] = [{
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
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }
    , {
    teamName: 'Mike team 3',
    teamId: '3456',
    teamUnitName: 'JV',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 4',
    teamId: '4567',
    teamUnitName: 'Freshman',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 5',
    teamId: '5678',
    teamUnitName: 'Sophomore',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 6',
    teamId: '6789',
    teamUnitName: 'Senior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 7',
    teamId: '7890',
    teamUnitName: 'Junior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 8',
    teamId: '8901',
    teamUnitName: 'Varsity',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 9',
    teamId: '9012',
    teamUnitName: 'JV',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 10',
    teamId: '0123',
    teamUnitName: 'Freshman',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 11',
    teamId: '1234',
    teamUnitName: 'Sophomore',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 12',
    teamId: '2345',
    teamUnitName: 'Senior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 13',
    teamId: '3456',
    teamUnitName: 'Junior',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }, {
    teamName: 'Mike team 14',
    teamId: '4567',
    teamUnitName: 'Varsity',
    ownerId: 'owner123',
    teamLogoUrl: 'http://example.com/logo.png',
    teamAbbreviation: 'MT',
    teamUnitId: 'unit123',
    teamUnitManagersIds: [],
    teamUnitManagers: [],
    teamUnitFlavor: 'default',
    teamUnitPlayers: [],
    teamUnitCoach: {
      profilePicture: 'someurl.com/image',
      userId: '123412341',
      userFirstName: 'Edgar',
      userLastName: 'Barajas',
      userIsCoach: true,
      userMail: 'edgar@edgar.com',
      contactPhone: '234567',
      contactEmail: 'edgar@edgar.com',
    }
  }]

}
