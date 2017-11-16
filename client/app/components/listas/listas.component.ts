import { Component } from '@angular/core';
import {ListaService} from '../../services/lista.service';
import {Lista} from '../../../Lista';
import {Producto} from '../../../Producto';

@Component({
  moduleId: module.id,
  selector: 'listas',
  templateUrl: 'listas.component.html'
})

export class ListasComponent { 
  listas: Lista[];
  productos: Producto[];
  productosLista: Producto[];
  nombre: string;
  listaActual: Lista;
  supermercado: string;

  constructor(private listaService:ListaService){
  	this.listaService.getListas()
  		.subscribe(listas => {
  			this.listas = listas;
  		});
  }

  getProductos(supermercado, lista){
    event.preventDefault();
    this.listaService.getProductos(supermercado)
      .subscribe(productos => {
        this.productos = productos;
        this.listaActual = lista;
      });
  }

  getLista(idlista){
    event.preventDefault();
    this.listaService.getLista(idlista)
      .subscribe(lista => {
        this.productosLista = []
        this.listaActual = lista;
        for(var i = 0;i < lista.productos.length;i++){
            this.listaService.getProducto(lista.productos[i])
            .subscribe(producto => {
              producto.cantidad=1;
              this.productosLista.push(producto);
            });
        }        
      });
  }

  setProducto(lista, producto){
        
        var prods = [""]
        prods.push(lista.productosDentro);
        var _lista = {
            _id: lista._id,
            nombre: lista.nombre,
            supermercado: lista.supermercado,
            producto: (producto._id)
        };
        this.listaService.setProducto(_lista).subscribe(data => {
            
        });
  }

  setWalmart(){
    this.supermercado="Walmart";
  }
  setPali(){
    this.supermercado="Pali";
  }
  setAmigazo(){
    this.supermercado="El Amigazo";
  }

  addLista(event){
  	event.preventDefault();
  	var newLista = {
  		nombre: this.nombre,
  		supermercado: this.supermercado,
  		productos: []
  	}

  	this.listaService.addLista(newLista)
  		.subscribe(lista => {
  			this.listas.push(lista);
  			this.nombre = '';
  			this.supermercado = '';
  		})
  }

  deleteLista(id){
        var listas = this.listas;
        this.listaService.deleteLista(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < listas.length;i++){
                    if(listas[i]._id == id){
                        listas.splice(i, 1);
                    }
                }
            }
        });
    }

}