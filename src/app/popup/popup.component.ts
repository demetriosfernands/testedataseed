import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getUsuarioById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.usuarioForm.setValue({
          id: this.editdata.id, nome: this.editdata.nome, email: this.editdata.email,
          dataNascimento: this.editdata.dataNascimento
        });
      });
    }
  }

  usuarioForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    nome: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    dataNascimento: this.builder.control(''),
  });

  salvarUsuario() {
    if (this.usuarioForm.valid) {
      const Editid = this.usuarioForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.EditarUsuario(Editid, this.usuarioForm.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Atualizado com sucesso.")
        });
      } else {
        this.api.CriarUsuario(this.usuarioForm.value).subscribe(response => {
          this.closepopup();
          alertify.success("Salvo com sucesso.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
