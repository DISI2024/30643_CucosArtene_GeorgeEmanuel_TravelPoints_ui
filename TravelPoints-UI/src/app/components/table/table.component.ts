import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {TouristAttraction} from "../../models/TouristAttraction";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    HttpClientModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatFabButton,
    NgIf,
    MatPaginatorModule
  ],
  providers:[TouristAttractionService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'imageUrl', 'name', 'location', 'category', 'createdAt', 'description', 'entryPrice', 'offers', 'actions'];
  dataSource: MatTableDataSource<TouristAttraction> | any
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  constructor(private touristAttractionService: TouristAttractionService, public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.touristAttractionService.getAllTouristAttractions().subscribe({
      next:(destinations: TouristAttraction[]) => {
      this.dataSource = new MatTableDataSource<TouristAttraction>(destinations);
    }})
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
