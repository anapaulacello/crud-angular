import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm:FormGroup;
  title="Crear Producto"
  id:string|null;
  constructor(private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private productoService:ProductoService,
    private activateRoute: ActivatedRoute) { 
    this.productoForm=this.fb.group({
      producto:['',Validators.required],
      categoria:['',Validators.required],
      ubicacion:['',Validators.required],
      precio:['',Validators.required],
    })
    this.id=this.activateRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar()
  }
  agregarProducto(){
    const NEW_PRODUCTO:Producto={
      nombre:this.productoForm.get('producto')?.value,
      categoria:this.productoForm.get('categoria')?.value,
      ubicacion:this.productoForm.get('ubicacion')?.value,
      precio:this.productoForm.get('precio')?.value,
    }
    if(this.id!==null){
      this.productoService.updateProducto(this.id, NEW_PRODUCTO).subscribe(data=>{
        this.toastr.info('producto actualizado', 'producto actualizado');
        this.router.navigate(['/'])
      },error=>{
        console.log(error)
        this.productoForm.reset()
      })
    }else{
      console.log(NEW_PRODUCTO)
      this.productoService.createProducto(NEW_PRODUCTO).subscribe(data=>{
        this.toastr.success('producto registrado', 'producto registrado');
        this.router.navigate(['/'])
      },error=>{
        console.log(error)
        this.productoForm.reset()
      })
    }
  }

  esEditar(){
    if(this.id!==null){
      this.title="Editar Producto"
      this.productoService.getProducto(this.id).subscribe(data=>{
         this.productoForm.setValue({
          producto:data.data.producto[0].nombre,
          categoria:data.data.producto[0].categoria,
          ubicacion:data.data.producto[0].ubicacion,
          precio:data.data.producto[0].precio
        }) 
      })
    }
  }
}
