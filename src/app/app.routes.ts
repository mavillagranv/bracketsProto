import { Routes } from '@angular/router';
import { BracketsStartComponent } from './comp/brackets/brackets-start/brackets-start.component';
import { BPoolEditorComponent } from './comp/brackets/b-pool-editor/b-pool-editor.component';
import { BracketEditorComponent } from './comp/brackets/bracket-editor/bracket-editor.component';
import { HomeComponent } from './comp/home/home.component';
import { SigleBracketEditorComponent } from './comp/brackets/sigle-bracket-editor/sigle-bracket-editor.component';
import { VenueListComponent } from './comp/venues/venue-list/venue-list.component';

export const routes: Routes = [
    { path: "brackets/:publicId", component: BracketsStartComponent },
    { path: "bracketEditor/:publicId", component: SigleBracketEditorComponent },
    { path: "venues", component: VenueListComponent },

    { path: "poolEditor/:publicId", component: BPoolEditorComponent },
    { path: "singleBracket/:publicId", component: BracketEditorComponent },
    { path: '', component: HomeComponent },
    { path: '*', component: HomeComponent },
];
