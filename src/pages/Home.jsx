
import Background from '../img/top.jpg'
export const Home = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${Background})`}}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">TURNUVAMVAR'A HOŞGELDİNİZ</h1>
            <p className="mb-5">
              Futbol tutkunlarının vazgeçilmez adresi TURNUVAMVAR. Kolaylıkla turnuva düzenleyebilir, turnuvayı yönetebilir ve turnuvanın gidişatını sitemiz üzerinden takip edebilirsiniz.
            </p>
            <button className="btn btn-primary">KAYIT OL</button>
          </div>
        </div>
      </div>
    </>
  );
};
