"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lista_service_1 = require("../../services/lista.service");
var ListasComponent = /** @class */ (function () {
    function ListasComponent(listaService) {
        var _this = this;
        this.listaService = listaService;
        this.listaService.getListas()
            .subscribe(function (listas) {
            _this.listas = listas;
        });
    }
    ListasComponent.prototype.getProductos = function (supermercado, lista) {
        var _this = this;
        event.preventDefault();
        this.listaService.getProductos(supermercado)
            .subscribe(function (productos) {
            _this.productos = productos;
            _this.listaActual = lista;
        });
    };
    ListasComponent.prototype.getLista = function (idlista) {
        var _this = this;
        event.preventDefault();
        this.listaService.getLista(idlista)
            .subscribe(function (lista) {
            _this.productosLista = [];
            _this.listaActual = lista;
            for (var i = 0; i < lista.productos.length; i++) {
                _this.listaService.getProducto(lista.productos[i])
                    .subscribe(function (producto) {
                    producto.cantidad = 1;
                    _this.productosLista.push(producto);
                });
            }
        });
    };
    ListasComponent.prototype.setProducto = function (lista, producto) {
        var prods = [""];
        prods.push(lista.productosDentro);
        var _lista = {
            _id: lista._id,
            nombre: lista.nombre,
            supermercado: lista.supermercado,
            producto: (producto._id)
        };
        this.listaService.setProducto(_lista).subscribe(function (data) {
        });
    };
    ListasComponent.prototype.setWalmart = function () {
        this.supermercado = "Walmart";
    };
    ListasComponent.prototype.setPali = function () {
        this.supermercado = "Pali";
    };
    ListasComponent.prototype.setAmigazo = function () {
        this.supermercado = "El Amigazo";
    };
    ListasComponent.prototype.addLista = function (event) {
        var _this = this;
        event.preventDefault();
        var newLista = {
            nombre: this.nombre,
            supermercado: this.supermercado,
            productos: []
        };
        this.listaService.addLista(newLista)
            .subscribe(function (lista) {
            _this.listas.push(lista);
            _this.nombre = '';
            _this.supermercado = '';
        });
    };
    ListasComponent.prototype.deleteLista = function (id) {
        var listas = this.listas;
        this.listaService.deleteLista(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < listas.length; i++) {
                    if (listas[i]._id == id) {
                        listas.splice(i, 1);
                    }
                }
            }
        });
    };
    ListasComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'listas',
            templateUrl: 'listas.component.html'
        }),
        __metadata("design:paramtypes", [lista_service_1.ListaService])
    ], ListasComponent);
    return ListasComponent;
}());
exports.ListasComponent = ListasComponent;
//# sourceMappingURL=listas.component.js.map