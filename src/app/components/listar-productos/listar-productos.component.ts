import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
listProductos:Producto[]=[];
  constructor(private productoService: ProductoService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(){
    this.productoService.getProductos().subscribe(element=>{
      console.log(element)
      this.listProductos = element.data.productos
    },error=>{
      console.log(error)
    })
  }

  delteProducto(id:any){
    this.productoService.deleteProducto(id).subscribe(data=>{
      this.toastr.error('el producto fue eliminado','producto eliminado')
      this.getAllProductos();
      },error=>{
        console.log(error)
      })
  }
}
