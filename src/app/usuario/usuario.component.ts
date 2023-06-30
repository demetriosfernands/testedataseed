import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../Model/usuario';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  companydata!: Usuario[];
  finaldata:any;


  ngOnInit(): void {
    this.CarregarUsuarios();
  }

  displayColums: string[] = ["id", "nome", "email", "dataNascimento", "action"]

  AbrirModal(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.CarregarUsuarios();
    });
  }

  CarregarUsuarios() {
    this.api.GetAllUsuarios().subscribe(response => {
      this.companydata = response;
      this.finaldata=new MatTableDataSource<Usuario>(this.companydata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditarUsuario(id: any) {
    this.AbrirModal(id);
  }
  RemoverUsuario(id: any) {
    alertify.confirm("Remover usuário", "Você quer remover este usuário ?", () => {
      this.api.RemoverUsuario(id).subscribe(r => {
        this.CarregarUsuarios();
      });
    }, function () {

    })


  }

}
