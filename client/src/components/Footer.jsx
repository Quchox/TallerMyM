
const Footer = () => {
return (

<footer className="footer footer-white-text">
<section
  className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
></section>

<section className="">
  <div className="container text-center text-md-start mt-5">
    <div
      className="d-flex justify-content-start flex-column align-items-start ms-4 mb-5"
    >
      <h5>Estamos en</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </div>

    <div className="row mt-3">
      <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Taller Mecánico</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>

      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Productos y servicios</h6>
        <p>
          <a href="#!" className="text-reset">Mantenimiento</a>
        </p>
        <p>
          <a href="#!" className="text-reset">Reparación</a>
        </p>
        <p>
          <a href="#!" className="text-reset">Modificaciones</a>
        </p>
        <p>
          <a href="#!" className="text-reset">Peronalización</a>
        </p>
      </div>

      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Redes sociales</h6>
        <p>
          <a href="#" className="text-reset">Facebook</a>
        </p>
        <p>
          <a href="#" className="text-reset">Instagram</a>
        </p>
        <p>
          <a href="#" className="text-reset">TikTok</a>
        </p>
      </div>

      <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
        <p>info@example.com</p>
        <p>+506 888 888</p>
        <p>+01 2420 2440</p>
      </div>
    </div>
  </div>
</section>

<div className="text-center p-4">
  <h6>
    © 2024 Derechos Reservados - Analisis y Modelado de Requerimientos
  </h6>
</div>
</footer>

);

}

export default Footer;