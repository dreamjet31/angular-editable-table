import { Component, DefaultIterableDiffer, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { Element, ElementColumns } from './model/element'
import { ElementService } from './services/element.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = ElementColumns.map((col) => col.key)
  columnsSchema: any = ElementColumns
  dataSource = new MatTableDataSource<Element>()
  valid: any = {}

  constructor(public dialog: MatDialog, private elementService: ElementService) { }

  ngOnInit() {
    this.elementService.getElements().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: Element) {
    if (row.position === 0) {
      this.elementService.addElement(row).subscribe((newElement: Element) => {
        row.position = newElement.position
        row.isEdit = false
      })
    } else {
      this.elementService.updateElement(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: Element = {
      position: 0,
      name: '',
      weight: 0,
      symbol: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(position: number) {
    this.elementService.deleteElement(position).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Element) => u.position !== position,
      )
    })
  }

  removeSelectedRows() {
    const elements = this.dataSource.data.filter((u: Element) => u.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.elementService.deleteElements(elements).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Element) => !u.isSelected,
            )
          })
        }
      })
  }

  inputHandler(e: any, position: number, key: string) {
    if (!this.valid[position]) {
      this.valid[position] = {}
    }
    this.valid[position][key] = e.target.validity.valid
    console.log(this.valid)
  }

  disableSubmit(position: number) {
    if (this.valid[position]) {
      return Object.values(this.valid[position]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
