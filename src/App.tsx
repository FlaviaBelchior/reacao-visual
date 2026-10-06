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
 {to:'/glossario',icon:'🤟',title:'Glossário Bilíngue',description:'Português + Libras + representação visual.'},
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

function Libras({label='Vídeo em Libras validado será inserido aqui'}:{label?:string}){
 return <div className="libras"><span className="libras-icon">🤟</span><div><strong>Libras integrada</strong><p>{label}</p></div></div>;
}

function Shell(){
 return <div className="shell">
  <header className="site-header">
   <div className="header-inner">
    <Link to="/" className="brand">
     <span className="brand-mark">R</span>
     <span className="brand-copy"><strong>ReAção Visual</strong><small>Química bilíngue e visual</small></span>
    </Link>
    <nav className="topnav">
     <NavLink to="/">Início</NavLink>
     <NavLink to="/explorar">Explorar</NavLink>
     <NavLink to="/detetive">Detetive</NavLink>
     <NavLink to="/laboratorio">Laboratório</NavLink>
     <NavLink to="/glossario">Glossário</NavLink>
     <NavLink to="/sobre">Sobre</NavLink>
    </nav>
    <span className="header-badge">🤟 Libras + PT-BR</span>
   </div>
  </header>
  <main><Outlet/></main>
  <nav className="mobile-nav">
   <NavLink to="/"><span>⌂</span>Início</NavLink>
   <NavLink to="/explorar"><span>🔍</span>Explorar</NavLink>
   <NavLink to="/laboratorio"><span>🧪</span>Lab</NavLink>
   <NavLink to="/glossario"><span>🤟</span>Glossário</NavLink>
   <NavLink to="/sobre"><span>◉</span>Sobre</NavLink>
  </nav>
 </div>;
}

function Home(){
 const [mods,setMods]=useState<ModuleCard[]>(fallbackModules);
 useEffect(()=>{
  supabase.from('modules').select('slug,title,description,sort_order').eq('published',true).order('sort_order').then(({data})=>{
   if(data&&data.length){
    setMods(data.map((x:any)=>({to:'/'+x.slug,icon:icons[x.slug]||'🧪',title:x.title,description:x.description||''})));
   }
  });
 },[]);

 return <section className="page home-page">
  <section className="hero-pro">
   <div className="hero-copy">
    <div className="hero-tags"><span>IFCE • Produto educacional</span><span>DUA + Pedagogia Visual</span></div>
    <h1>Química para <em>ver</em>, sinalizar, experimentar e compreender.</h1>
    <p className="hero-lead">Uma experiência bilíngue criada desde o início para estudantes surdos, com Libras, português escrito e investigação científica lado a lado.</p>
    <div className="hero-actions">
     <Link className="primary-cta" to="/explorar" onClick={()=>track('hero_cta_clicked',{target:'explorar'})}>Começar investigação <span>→</span></Link>
     <Link className="secondary-cta" to="/sobre">Conhecer o projeto</Link>
    </div>
    <div className="flow">
     <span><b>01</b> 👀 Observe</span>
     <span><b>02</b> 💭 Preveja</span>
     <span><b>03</b> 🧪 Investigue</span>
     <span><b>04</b> 💬 Explique</span>
    </div>
   </div>

   <div className="hero-visual" aria-label="Representação visual de uma reação química">
    <span className="visual-label">REAÇÃO EM FOCO</span>
    <div className="visual-equation">
     <div className="atom-group blue-atoms"><span>H</span><span>H</span></div>
     <strong>+</strong>
     <div className="atom-group orange-atoms"><span>O</span><span>O</span></div>
     <strong>→</strong>
     <div className="atom-group water-atoms"><span>H</span><span>O</span><span>H</span></div>
    </div>
    <div className="beaker"><span className="bubble b1"></span><span className="bubble b2"></span><span className="bubble b3"></span></div>
    <div className="visual-copy"><strong>Veja o que muda.</strong><span>Átomos se reorganizam. A matéria conta uma história visual.</span></div>
   </div>
  </section>

  <div className="section-heading">
   <div><span className="section-kicker">TRILHAS INTERATIVAS</span><h2>Escolha como começar</h2></div>
   <p>Explore fenômenos, monte equações, teste hipóteses e conecte a química à vida real.</p>
  </div>

  <div className="module-grid">
   {mods.map((m,i)=><Link key={m.to} to={m.to} className={'module-card module-'+(i+1)} onClick={()=>track('module_started',{module_path:m.to,module_title:m.title})}>
    <div className="module-top"><span className="module-icon">{m.icon}</span><span className="module-number">{String(i+1).padStart(2,'0')}</span></div>
    <div><h3>{m.title}</h3><p>{m.description}</p></div>
    <span className="module-link">Abrir módulo <b>→</b></span>
   </Link>)}
  </div>

  <section className="libras-feature">
   <div className="libras-symbol">🤟</div>
   <div>
    <span className="section-kicker purple">BILINGUISMO DESDE A CONCEPÇÃO</span>
    <h2>Libras não fica escondida em “acessibilidade”.</h2>
    <p>Ela aparece junto aos conceitos, às instruções e às representações visuais. Quando um sinal-termo ainda não foi validado, o sistema deixa isso claro em vez de inventar um sinal.</p>
   </div>
   <Link to="/glossario" className="feature-link">Explorar glossário <span>→</span></Link>
  </section>

  <div className="science-strip">
   <div><strong>3 linguagens</strong><span>Macroscópica • Microscópica • Simbólica</span></div>
   <div><strong>Sem áudio obrigatório</strong><span>A experiência funciona visualmente</span></div>
   <div><strong>Aprender fazendo</strong><span>Prever • Testar • Registrar • Explicar</span></div>
  </div>
 </section>;
}

function Explore(){
 const cases=[['🧊','Gelo derretendo','mudança física'],['🔥','Madeira queimando','provável reação química'],['🍎','Maçã escurecendo','provável reação química'],['✂️','Papel cortado','mudança física'],['🥖','Pão crescendo','provável reação química'],['💊','Comprimido efervescente','provável reação química']];
 const [ans,setAns]=useState<Record<number,string>>({});
 return <section className="page inner-page"><div className="page-intro"><span>01 • EXPLORAR</span><h1>O que é uma reação?</h1><p>Classifique cada situação. O objetivo é investigar, não apenas acertar.</p></div><Libras/><div className="stack">{cases.map((c,i)=><article className="panel" key={c[1]}><h2>{c[0]} {c[1]}</h2><div className="choices">{['mudança física','provável reação química','quero investigar mais'].map(o=><button className={ans[i]===o?'choice active':'choice'} onClick={()=>setAns({...ans,[i]:o})} key={o}>{o}</button>)}</div>{ans[i]&&<p className="feedback">Sua hipótese: <strong>{ans[i]}</strong>. Referência científica: {c[2]}.</p>}</article>)}</div></section>;
}

function Detective(){
 const scenes=[['🫧','Formação de bolhas'],['🎨','Mudança de cor'],['⬇️','Formação de precipitado'],['🌡️','Alteração de energia']];
 return <section className="page inner-page"><div className="page-intro"><span>02 • INVESTIGAR EVIDÊNCIAS</span><h1>Detetive das Reações</h1><p>Esses sinais podem ser evidências, mas isoladamente não provam uma reação química.</p></div><div className="grid">{scenes.map(s=><article className="card static" key={s[1]}><span className="icon">{s[0]}</span><div><h3>{s[1]}</h3><p>Observe o contexto e procure outras evidências antes de concluir.</p></div></article>)}</div></section>;
}

function Lab(){
 const [a,setA]=useState(''),[b,setB]=useState('');
 const diff=a&&b?(Number(b)-Number(a)).toFixed(2):null;
 return <section className="page inner-page"><div className="page-intro"><span>03 • EXPERIMENTAR</span><h1>Laboratório Visual</h1><p>Observe no mundo visível, interprete partículas e conecte tudo à equação química.</p></div><div className="safety">🟢 Baixo risco — requer supervisão adequada e uso correto dos materiais. Não use recipiente rígido totalmente fechado.</div><Libras/><h2>O gás invisível</h2><p>Vinagre + bicarbonato de sódio, usando um balão para manter o gás no sistema.</p><div className="inputs"><label>Massa inicial (g)<input inputMode="decimal" value={a} onChange={e=>setA(e.target.value)}/></label><label>Massa final (g)<input inputMode="decimal" value={b} onChange={e=>setB(e.target.value)}/></label></div>{diff&&<div className="result">Diferença: <strong>{diff} g</strong></div>}<div className="equation">NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂</div><div className="tabs"><article><strong>👀 Macroscópico</strong><p>Bolhas aparecem e o balão infla.</p></article><article><strong>⚛️ Microscópico</strong><p>As partículas se reorganizam, formando novas substâncias.</p></article><article><strong>∑ Simbólico</strong><p>A equação representa reagentes e produtos.</p></article></div></section>;
}

function Builder(){
 const [h2,setH2]=useState(1),[o2,setO2]=useState(1),[h2o,setH2o]=useState(1);
 const ok=2*h2===2*h2o&&2*o2===h2o;
 const C=({v,set}:{v:number;set:(n:number)=>void})=><span className="counter"><button onClick={()=>set(Math.max(1,v-1))}>−</button><strong>{v}</strong><button onClick={()=>set(v+1)}>+</button></span>;
 return <section className="page inner-page"><div className="page-intro"><span>04 • MONTAR E EQUILIBRAR</span><h1>Construtor de Reações</h1><p>Ajuste os coeficientes até ter a mesma quantidade de átomos nos dois lados.</p></div><div className="equation builder"><C v={h2} set={setH2}/> H₂ + <C v={o2} set={setO2}/> O₂ → <C v={h2o} set={setH2o}/> H₂O</div><div className="result"><p>H: esquerda {2*h2} | direita {2*h2o}</p><p>O: esquerda {2*o2} | direita {h2o}</p></div>{ok&&<div className="success">✅ Equação equilibrada!</div>}</section>;
}

function Glossary(){
 const [q,setQ]=useState('');
 const [terms,setTerms]=useState<Term[]>(fallbackTerms);
 useEffect(()=>{
  supabase.from('glossary_terms').select('term_pt,definition_pt,example,libras_status').order('term_pt').then(({data})=>{
   if(data&&data.length){
    setTerms(data.map((x:any)=>({term:x.term_pt,definition:x.definition_pt,example:x.example,librasStatus:x.libras_status})));
   }
  });
 },[]);
 const list=useMemo(()=>terms.filter(t=>t.term.toLowerCase().includes(q.toLowerCase())),[q,terms]);
 return <section className="page inner-page"><div className="page-intro"><span>05 • VOCABULÁRIO CIENTÍFICO</span><h1>Glossário Bilíngue</h1><p>Português escrito, representação visual e espaço permanente para Libras validada.</p></div><input className="search" aria-label="Pesquisar no glossário" placeholder="Pesquisar termo científico…" value={q} onChange={e=>setQ(e.target.value)}/>{list.map(t=><article className="panel glossary-card" key={t.term}><div><h2>{t.term}</h2><p>{t.definition}</p>{t.example&&<p><strong>Exemplo:</strong> {t.example}</p>}</div><Libras label={t.librasStatus==='validated'?'Vídeo em Libras validado':'Vídeo validado será inserido aqui'}/></article>)}</section>;
}

function Missions(){
 const items=['Por que o ferro enferruja?','Por que o bolo cresce?','Como funciona um comprimido efervescente?','De onde vem o CO₂?','Por que alimentos mudam durante o cozimento?'];
 return <section className="page inner-page"><div className="page-intro"><span>06 • QUÍMICA NA VIDA</span><h1>Missões do Cotidiano</h1><p>Investigue situações reais e descubra por que o conhecimento químico importa.</p></div><div className="stack">{items.map((x,i)=><details className="panel" key={x}><summary>{String(i+1).padStart(2,'0')} • {x}</summary><p>Observe o fenômeno, identifique a transformação e responda: <strong>para que esse conhecimento serve na vida?</strong></p></details>)}</div></section>;
}

function Achievements(){
 return <section className="page inner-page"><div className="page-intro"><span>PROGRESSO PESSOAL</span><h1>Minhas Conquistas</h1><p>Sem ranking: o foco é acompanhar o seu próprio percurso.</p></div><div className="grid">{['Primeiro Cientista','Detetive Químico','Experimento Concluído','Equação Equilibrada','Explorador do Cotidiano'].map(x=><article className="card static" key={x}><span className="icon">🏅</span><h3>{x}</h3></article>)}</div></section>;
}

function About(){
 return <section className="page inner-page"><div className="page-intro"><span>SOBRE O PRODUTO EDUCACIONAL</span><h1>Uma plataforma criada para incluir desde o primeiro pixel.</h1><p>ReAção Visual articula Libras, Língua Portuguesa escrita, Pedagogia Visual, DUA e investigação científica.</p></div><div className="grid"><article className="panel"><h2>🤟 Bilinguismo</h2><p>Libras aparece junto aos conceitos e não como tradução posterior.</p></article><article className="panel"><h2>👁️ Pedagogia Visual</h2><p>Imagens, modelos, cores funcionais e experimentos ajudam a construir significado.</p></article><article className="panel"><h2>🌈 DUA</h2><p>Diferentes formas de engajamento, representação e expressão.</p></article><article className="panel"><h2>🌍 Vida real</h2><p>Química conectada à saúde, tecnologia, sustentabilidade, cidadania e inclusão.</p></article></div></section>;
}

const router=createBrowserRouter([{path:'/',element:<Shell/>,children:[
 {index:true,element:<Home/>},
 {path:'explorar',element:<Explore/>},
 {path:'detetive',element:<Detective/>},
 {path:'laboratorio',element:<Lab/>},
 {path:'construtor',element:<Builder/>},
 {path:'glossario',element:<Glossary/>},
 {path:'missoes',element:<Missions/>},
 {path:'conquistas',element:<Achievements/>},
 {path:'sobre',element:<About/>}
]}]);

export default function App(){return <RouterProvider router={router}/>;}
