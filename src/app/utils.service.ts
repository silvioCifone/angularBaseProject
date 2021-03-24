import { Injectable } from '@angular/core';
import { Language } from './models/language';
import { Languages } from './models/languages';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

   languages : Language[] = [
    {
        name: "Italiano",
        value: Languages.ITA
    },
    {
      name: "English",
      value: Languages.ENG
    }
  ];

  constructor() { }
}
