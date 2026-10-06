import {useEffect,useMemo,useState} from 'react';
import {createBrowserRouter,NavLink,Outlet,RouterProvider,Link} from 'react-router-dom';
import {supabase} from './lib/supabase';
import {track} from './lib/analytics';

type ModuleCard={to:string;icon:string;title:string;description:string};
type Term={term:string;definition:string;example?:string|null;librasStatus:string};

const icons:Record<string,string>={explorar:'🔍',detetive:'🕵️',laboratorio:'🧪',construtor:'⚛️',glossario:'🤟',missoes:'🌎'};
const fallbackModules:ModuleCard[]=[
 {to:'/explorar',icon:'🔍',title:'Explorar',description:'Descubra o que realmente é uma reação.'},
 {to:'/detetive',icon:'🕵️',title:'Detetive das Reações',description:'Encontre pistas e construa evidências.'},
 {to:'/laboratorio',icon:'🧪',title:'Laboratório Visual',description:'Preveja, experimente e compare.'},
 {to:'/construtor',icon:'⚛️',title:'Construtor de Reações',description:'Monte e equilibre os átomos.'},
 {to:'/glossario',icon:'🤟',title:'Glossário em Libras',description:'Sinais validados + português escrito + representação visual.'},
 {to:'/missoes',icon:'🌎',title:'Missões do Cotidiano',description:'Veja a Química na vida real.'}
];
const fallbackTerms:Term[]=[
 {term:'Átomo',definition:'Unidade básica que compõe a matéria.',librasStatus:'pending'},
 {term:'Molécula',definition:'Conjunto de dois ou mais átomos ligados.',librasStatus:'pending'},
 {term:'Reação química',definition:'Transformação em que reagentes formam novas substâncias.',librasStatus:'pending'},
 {term:'Reagente',definition:'Substância presente no início de uma reação.',librasStatus:'pending'},
 {term:'Produto',definition:'Substância formada ao final de uma reação.',librasStatus:'pending'},
 {term:'Conservação da massa',definition:'Em sistema fechado, a massa total é conservada durante a reação.',librasStatus:'pending'}
];

function LibrasVideo({title,compact=false,status='pending'}:{title:string;compact?:boolean;status?:string}){
 return <div className={compact?'libras-video compact':'libras-video'}>
  <div className="video-stage">
   <span className="video-hand">🤟</span>
   <div className="video-rings"><i></i><i></i><i></i></div>
   <span className="video-status">{status==='validated'?'✓ Libras validada':'Vídeo em Libras • aguardando validação'}</span>
  </div>
  <div className="video-meta"><strong>{title}</strong><span>Conteúdo principal em Libras. Português escrito aparece como apoio.</span></div>
 </div>;
}

function SupportText({children}:{children:React.ReactNode}){
 return <details className="support-text"><summary>Português escrito de apoio</summary><div>{children}</div></details>;
}

function ResponseMode({prompt='Como você quer explicar o que aprendeu?'}:{prompt?:string}){
 const [mode,setMode]=useState('');
 return <section className="response-mode">
  <div><span className="section-kicker purple">EXPRESSÃO DO ESTUDANTE</span><h3>{prompt}</h3></div>
  <div className="response-options">
   <button className={mode==='libras'?'response-option selected':''} onClick={()=>setMode('libras')}><span>🤟</span><strong>Responder em Libras</strong><small>Vídeo / apresentação sinalizada</small></button>
   <button className={mode==='texto'?'response-option selected':''} onClick={()=>setMode('texto')}><span>✍️</span><strong>Responder por texto</strong><small>Português escrito</small></button>
   <button className={mode==='visual'?'response-option selected':''} onClick={()=>setMode('visual')}><span>🧩</span><strong>Responder visualmente</strong><small>Desenho, moléculas ou esquema</small></button>
  </div>
  {mode==='libras'&&<div className="response-placeholder">📹 Área preparada para gravação de resposta em Libras na próxima etapa do projeto.</div>}
  {mode==='texto'&&<textarea aria-label="Resposta em português escrito" placeholder="Escreva sua explicação aqui…"/>}
  {mode==='visual'&&<div className="response-placeholder">🧩 Área preparada para montagem visual, desenho ou organização de partículas.</div>}
 </section>;
}

function Shell(){
 return <div className="shell">
  <header className="site-header">
   <div className="header-inner">
    <Link to="/" className="brand"><span className="brand-mark">R</span><span className="brand-copy"><strong>ReAção Visual</strong><small>Libras primeiro • Química visual</small></span></Link>
    <nav className="topnav">
     <NavLink to="/libras">🤟 Central em Libras</NavLink>
     <NavLink to="/explorar">Explorar</NavLink>
     <NavLink to="/laboratorio">Laboratório</NavLink>
     <NavLink to="/glossario">Glossário</NavLink>
     <NavLink to="/sobre">Sobre</NavLink>
    </nav>
    <span className="header-badge">Libras = comunicação principal</span>
   </div>
  </header>
  <main><Outlet/></main>
  <nav className="mobile-nav">
   <NavLink to="/libras"><span>🤟</span>Libras</NavLink>
   <NavLink to="/explorar"><span>🔍</span>Explorar</NavLink>
   <NavLink to="/laboratorio"><span>🧪</span>Lab</NavLink>
   <NavLink to="/glossario"><span>📘</span>Glossário</NavLink>
   <NavLink to="/sobre"><span>◉</span>Sobre</NavLink>
  </nav>
 </div>;
}

function Home(){
 const [mods,setMods]=useState<ModuleCard[]>(fallbackModules);
 useEffect(()=>{supabase.from('modules').select('slug,title,description,sort_order').eq('published',true).order('sort_order').then(({data})=>{if(data?.length)setMods(data.map((x:any)=>({to:'/'+x.slug,icon:icons[x.slug]||'🧪',title:x.title,description:x.description||''})))})},[]);
 return <section className="page home-page">
  <div className="language-priority"><strong>🤟 Libras é a língua principal desta experiência.</strong><span>O português escrito funciona como apoio de leitura e registro.</span></div>

  <section className="libras-first-hero">
   <div className="hero-libras-column">
    <span className="section-kicker purple">COMECE PELA LIBRAS</span>
    <LibrasVideo title="Boas-vindas: o que vamos investigar em Química?"/>
    <Link className="primary-cta" to="/libras">Entrar na Central em Libras <span>→</span></Link>
   </div>
   <div className="hero-copy">
    <div className="hero-tags"><span>IFCE • Produto educacional</span><span>DUA + Pedagogia Visual</span></div>
    <h1>Química para <em>ver</em>, sinalizar e compreender.</h1>
    <p className="hero-lead">A comunicação começa em Libras. Imagens, experimentos, partículas e equações ajudam a construir o significado; o português escrito apoia a aprendizagem.</p>
    <div className="flow"><span><b>01</b> 🤟 Sinalize</span><span><b>02</b> 👀 Observe</span><span><b>03</b> 🧪 Investigue</span><span><b>04</b> 💬 Explique</span></div>
   </div>
  </section>

  <div className="section-heading"><div><span className="section-kicker">TRILHAS INTERATIVAS</span><h2>Aprenda com Libras + investigação visual</h2></div><p>Cada módulo começa com comunicação em Libras e segue para observação, manipulação e expressão do estudante.</p></div>
  <div className="module-grid">{mods.map((m,i)=><Link key={m.to} to={m.to} className={'module-card module-'+(i+1)} onClick={()=>track('module_started',{module_path:m.to,module_title:m.title})}>
   <div className="module-top"><span className="module-icon">{m.icon}</span><span className="module-number">0{i+1}</span></div>
   <div><span className="libras-chip">🤟 Instrução em Libras</span><h3>{m.title}</h3><p>{m.description}</p></div>
   <span className="module-link">Abrir módulo <b>→</b></span>
  </Link>)}</div>

  <section className="communication-principle">
   <div className="communication-icon">🤟</div>
   <div><span className="section-kicker purple">PRINCÍPIO DO PROJETO</span><h2>Não traduzimos uma aula pronta. Construímos a aula em Libras desde o início.</h2><p>Conceito científico, sinalização, imagem, experimento e representação simbólica aparecem juntos. Sinais-termo só entram como “validados” após revisão de pessoas surdas e profissionais de Libras.</p></div>
  </section>
 </section>;
}

function LibrasHub(){
 const lessons=[
  ['👋','Boas-vindas','Como usar a plataforma e escolher uma trilha.'],
  ['🧪','Reação química','O que muda quando novas substâncias são formadas.'],
  ['🔵','Reagentes e produtos','O que existe antes e depois de uma reação.'],
  ['⚖️','Conservação da massa','Por que a matéria não desaparece.'],
  ['⚛️','Balanceamento','Como representar a mesma quantidade de átomos.'],
  ['🛡️','Segurança','Como investigar sem criar riscos desnecessários.']
 ];
 return <section className="page inner-page"><div className="page-intro"><span>CENTRAL EM LIBRAS</span><h1>Aprenda Química começando pela Libras.</h1><p>Escolha um conceito. O vídeo em Libras é a primeira explicação; texto e símbolos aparecem como apoio.</p></div>
 <div className="libras-lesson-grid">{lessons.map(x=><article className="libras-lesson" key={x[1]}><LibrasVideo title={x[1]} compact/><div className="lesson-support"><span>{x[0]}</span><div><strong>{x[1]}</strong><p>{x[2]}</p></div></div></article>)}</div>
 <div className="validation-note">⚠️ <strong>Regra de qualidade:</strong> nenhum sinal-termo de Química será inventado pela plataforma. Conteúdos sinalizados entram como validados somente após revisão adequada.</div>
 </section>;
}

function Explore(){
 const cases=[['🧊','Gelo derretendo','mudança física'],['🔥','Madeira queimando','provável reação química'],['🍎','Maçã escurecendo','provável reação química'],['✂️','Papel cortado','mudança física'],['🥖','Pão crescendo','provável reação química'],['💊','Comprimido efervescente','provável reação química']];
 const [ans,setAns]=useState<Record<number,string>>({});
 return <section className="page inner-page"><div className="page-intro"><span>01 • EXPLORAR</span><h1>O que é uma reação?</h1><p>Primeiro assista à explicação em Libras. Depois classifique situações do cotidiano.</p></div>
 <LibrasVideo title="Instrução em Libras: transformação física x reação química"/>
 <SupportText><p>Uma reação química forma novas substâncias. Nem toda mudança visível é uma reação.</p></SupportText>
 <div className="stack">{cases.map((c,i)=><article className="panel" key={c[1]}><h2>{c[0]} {c[1]}</h2><div className="choices">{['mudança física','provável reação química','quero investigar mais'].map(o=><button className={ans[i]===o?'choice active':'choice'} onClick={()=>setAns({...ans,[i]:o})} key={o}>{o}</button>)}</div>{ans[i]&&<p className="feedback">Sua hipótese: <strong>{ans[i]}</strong>. Referência científica: {c[2]}.</p>}</article>)}</div>
 <ResponseMode prompt="Explique em Libras ou de outra forma: como você reconheceria uma reação?"/>
 </section>;
}

function Detective(){
 const scenes=[['🫧','Formação de bolhas'],['🎨','Mudança de cor'],['⬇️','Formação de precipitado'],['🌡️','Alteração de energia']];
 return <section className="page inner-page"><div className="page-intro"><span>02 • DETETIVE</span><h1>Quais pistas indicam uma reação?</h1><p>A instrução vem em Libras; depois você procura evidências e decide se precisa investigar mais.</p></div>
 <LibrasVideo title="Instrução em Libras: evidências de reação química"/>
 <div className="grid">{scenes.map(s=><article className="card static" key={s[1]}><span className="icon">{s[0]}</span><div><h3>{s[1]}</h3><p>Pode ser uma evidência, mas precisa ser analisada no contexto.</p></div></article>)}</div>
 <ResponseMode prompt="Qual pista você considerou mais importante? Explique em Libras, texto ou visualmente."/>
 </section>;
}

function Lab(){
 const [a,setA]=useState(''),[b,setB]=useState(''); const diff=a&&b?(Number(b)-Number(a)).toFixed(2):null;
 return <section className="page inner-page"><div className="page-intro"><span>03 • LABORATÓRIO</span><h1>O gás invisível</h1><p>Assista à orientação em Libras antes de manipular os materiais.</p></div>
 <LibrasVideo title="Orientação em Libras: segurança + sequência do experimento"/>
 <div className="safety">🟢 Baixo risco — requer supervisão adequada. Não use recipiente rígido totalmente fechado.</div>
 <SupportText><p>Use vinagre + bicarbonato de sódio e um balão para manter o gás no sistema. Compare a massa antes e depois.</p></SupportText>
 <div className="inputs"><label>Massa inicial (g)<input inputMode="decimal" value={a} onChange={e=>setA(e.target.value)}/></label><label>Massa final (g)<input inputMode="decimal" value={b} onChange={e=>setB(e.target.value)}/></label></div>
 {diff&&<div className="result">Diferença observada: <strong>{diff} g</strong></div>}
 <div className="equation">NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂</div>
 <div className="tabs"><article><strong>👀 Macroscópico</strong><p>Bolhas aparecem e o balão infla.</p></article><article><strong>⚛️ Microscópico</strong><p>As partículas se reorganizam.</p></article><article><strong>∑ Simbólico</strong><p>A equação representa reagentes e produtos.</p></article></div>
 <ResponseMode prompt="Explique em Libras o que aconteceu com o gás e com a massa."/>
 </section>;
}

function Builder(){
 const [h2,setH2]=useState(1),[o2,setO2]=useState(1),[h2o,setH2o]=useState(1); const ok=2*h2===2*h2o&&2*o2===h2o;
 const C=({v,set}:{v:number;set:(n:number)=>void})=><span className="counter"><button onClick={()=>set(Math.max(1,v-1))}>−</button><strong>{v}</strong><button onClick={()=>set(v+1)}>+</button></span>;
 return <section className="page inner-page"><div className="page-intro"><span>04 • CONSTRUTOR</span><h1>Balanceamento com apoio visual</h1><p>Veja primeiro em Libras por que a quantidade de átomos deve ser conservada.</p></div>
 <LibrasVideo title="Explicação em Libras: coeficientes e conservação dos átomos"/>
 <div className="equation builder"><C v={h2} set={setH2}/> H₂ + <C v={o2} set={setO2}/> O₂ → <C v={h2o} set={setH2o}/> H₂O</div>
 <div className="result"><p>H: esquerda {2*h2} | direita {2*h2o}</p><p>O: esquerda {2*o2} | direita {h2o}</p></div>
 {ok&&<div className="success">✅ Equação equilibrada!</div>}
 <ResponseMode prompt="Mostre em Libras ou visualmente por que a equação ficou equilibrada."/>
 </section>;
}

function Glossary(){
 const [q,setQ]=useState(''); const [terms,setTerms]=useState<Term[]>(fallbackTerms);
 useEffect(()=>{supabase.from('glossary_terms').select('term_pt,definition_pt,example,libras_status').order('term_pt').then(({data})=>{if(data?.length)setTerms(data.map((x:any)=>({term:x.term_pt,definition:x.definition_pt,example:x.example,librasStatus:x.libras_status})))})},[]);
 const list=useMemo(()=>terms.filter(t=>t.term.toLowerCase().includes(q.toLowerCase())),[q,terms]);
 return <section className="page inner-page"><div className="page-intro"><span>05 • GLOSSÁRIO EM LIBRAS</span><h1>O sinal vem antes da definição escrita.</h1><p>Procure um conceito. A área principal mostra Libras; português, exemplo e símbolo ficam como apoio.</p></div>
 <input className="search" aria-label="Pesquisar no glossário" placeholder="Pesquisar termo científico…" value={q} onChange={e=>setQ(e.target.value)}/>
 <div className="glossary-list">{list.map(t=><article className="glossary-libras-card" key={t.term}><LibrasVideo title={t.term} compact status={t.librasStatus}/><div className="glossary-support"><span>PORTUGUÊS DE APOIO</span><h2>{t.term}</h2><p>{t.definition}</p>{t.example&&<p><strong>Exemplo:</strong> {t.example}</p>}</div></article>)}</div>
 </section>;
}

function Missions(){
 const items=['Por que o ferro enferruja?','Por que o bolo cresce?','Como funciona um comprimido efervescente?','De onde vem o CO₂?','Por que alimentos mudam durante o cozimento?'];
 return <section className="page inner-page"><div className="page-intro"><span>06 • QUÍMICA NA VIDA</span><h1>Missões do cotidiano</h1><p>Receba o desafio em Libras, investigue o fenômeno e responda do jeito que melhor comunica sua compreensão.</p></div>
 <LibrasVideo title="Instrução em Libras: como realizar as missões"/>
 <div className="stack">{items.map((x,i)=><details className="panel" key={x}><summary>{String(i+1).padStart(2,'0')} • {x}</summary><p>Observe o fenômeno, identifique a transformação e responda: <strong>para que esse conhecimento serve na vida?</strong></p></details>)}</div>
 <ResponseMode/>
 </section>;
}

function About(){
 return <section className="page inner-page"><div className="page-intro"><span>SOBRE</span><h1>Comunicação em Libras no centro da aprendizagem.</h1><p>O ReAção Visual não é uma plataforma em português “traduzida depois”. A experiência é planejada para que Libras, visualidade, investigação e autonomia façam parte da estrutura desde o início.</p></div>
 <div className="grid"><article className="panel"><h2>🤟 Libras primeiro</h2><p>Instruções e conceitos começam pela comunicação em Libras.</p></article><article className="panel"><h2>✍️ Português como apoio</h2><p>Texto escrito ajuda na leitura, registro e comparação de conceitos.</p></article><article className="panel"><h2>👁️ Visualidade científica</h2><p>Partículas, equações, ícones, cores e experimentos ensinam junto com a língua.</p></article><article className="panel"><h2>🧠 DUA</h2><p>O estudante pode compreender e expressar aprendizagem de diferentes maneiras.</p></article></div>
 </section>;
}

const router=createBrowserRouter([{path:'/',element:<Shell/>,children:[
 {index:true,element:<Home/>},{path:'libras',element:<LibrasHub/>},{path:'explorar',element:<Explore/>},{path:'detetive',element:<Detective/>},{path:'laboratorio',element:<Lab/>},{path:'construtor',element:<Builder/>},{path:'glossario',element:<Glossary/>},{path:'missoes',element:<Missions/>},{path:'sobre',element:<About/>}
]}]);

export default function App(){return <RouterProvider router={router}/>;}
