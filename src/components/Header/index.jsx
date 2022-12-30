import { useEffect, useState } from 'react';

export default function Header() {
  const [categorias, setCategorias] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    async function getApi() {
      const res = await fetch('https://meucatalogo00.b4a.app/categorias');
      const resJson = await res.json();
      setCategorias(
        resJson.sort((a, b) => {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
        })
      );
    }
    getApi();
  }, []);

  useEffect(() => {
    async function getApi() {
      categorias.map(async (categoria) => {
        const res = await fetch(`https://meucatalogo00.b4a.app/jogos-de-mesa`);

        const resJson = await res.json();

        setSearchedResults(resJson);
      });
    }
    getApi();
  }, [searchedValue, categorias, searchedResults]);

  return (
    <header>
      <a href="/">
        <img
          alt=""
          src="https://media.istockphoto.com/id/1197939518/vector/geek-boy-icon-vector-illustration-design.jpg?b=1&s=612x612&w=0&k=20&c=_SO7yoOQKiSCDzA_4U7Sl8E6QWxHYOe9niMpcaPbiyk="
          width="50"
          height="50"
        />
      </a>

      <input
        type="search"
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
        list="seachedResults"
      />
      <datalist id="seachedResults">
        {searchedResults.map((result) => (
          <option key={result._id} value={result.nomeUsa}>
            {result.categoria.nome} ({result.lancamento.slice(0, 4)})
          </option>
        ))}
      </datalist>
      <a>
        <button>o-</button>
      </a>
      <a href="/login">
        <button>Login</button>
      </a>
      <nav>
        <ul>
          {categorias.map((categoria) => {
            if (categoria.subcategorias.length === 0) {
              return (
                <li key={categoria.nome}>
                  <a
                    href={categoria.nome
                      .toLowerCase()
                      .normalize('NFD')
                      .replaceAll(' ', '-')
                      .replace(/[\u0300-\u036f]/g, '')}>
                    {categoria.nome}
                  </a>
                </li>
              );
            } else {
              return (
                <li key={categoria.nome}>
                  <details>
                    <summary>{categoria.nome}</summary>
                    <ul>
                      {categoria.subcategorias.map((subcategoria) => (
                        <li key={subcategoria.nome}>
                          <a
                            href={`/${categoria.nome
                              .toLowerCase()
                              .normalize('NFD')
                              .replace(' ', '-')
                              .replace(
                                /[\u0300-\u036f]/g,
                                ''
                              )}/${subcategoria.nome
                              .toLowerCase()
                              .normalize('NFD')
                              .replace(' ', '-')
                              .replace(/[\u0300-\u036f]/g, '')}`}>
                            {subcategoria.nome}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </header>
  );
}
