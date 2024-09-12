import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Element } from '../model/element';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private elements: Element[] = [
    {
      isSelected: false,
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      isEdit: false,
    },
    {
      isSelected: false,
      position: 10,
      name: 'Neon',
      weight: 20.1797,
       symbol: 'Ne',
      isEdit: false,
    },
  ];

  constructor() {}

  getElements(): Observable<Element[]> {
    return of(this.elements);
  }

  updateElement(element: Element): Observable<Element> {
    const index = this.elements.findIndex((u) => u.position === element.position);
    if (index !== -1) {
      this.elements[index] = element;
    }
    return of(element);
  }

  addElement(element: Element): Observable<Element> {
    element.position = this.elements.length + 1;
    this.elements.push(element);
    return of(element);
  }

  deleteElement(position: number): Observable<Element[]> {
    this.elements = this.elements.filter((element) => element.position !== position);
    return of(this.elements);
  }

  deleteElements(elements: Element[]): Observable<Element[]> {
    const idsToDelete = elements.map((element) => element.position);
    this.elements = this.elements.filter((element) => !idsToDelete.includes(element.position));
    return of(elements);
  }
}
