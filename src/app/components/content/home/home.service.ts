import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class HomeService {
  defaultConfigStart = [
    {
      name: 'Type 1',
      formconfig: {
        name: { config: { header: 'Name', placeholder: 'Write Name' } },
        input1: { config: { header: 'Input1', placeholder: 'Write input1' } },
        input2: { config: { header: 'Input2', placeholder: 'Write input2' } },
      },
    },
    {
      name: 'Type 2',
      formconfig: {
        name: { config: { header: 'Name', placeholder: 'Write Name' } },
        input7: { config: { header: 'Input7', placeholder: 'Write input7' } },
      },
    },
    {
      name: 'Type 3',
      formconfig: {
        name: { config: { header: 'Name', placeholder: 'Write Name' } },
        input3: { config: { header: 'Input3', placeholder: 'Write input3' } },
      },
    },
  ];
}
