import { supabase } from './supabase';
import { modules as localModules } from '../data/modules';

export type ModuleCard = {
  to: string;
  icon: string;
  title: string;
  description: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  example?: string | null;
  category?: string | null;
  librasStatus: 'pending' | 'validated';
  librasVideoPath?: string | null;
};

const iconBySlug: Record<string, string> = {
  libras: '🤟',
  explorar: '🔍',
  detetive: '🕵️',
  laboratorio: '🧪',
  construtor: '⚛️',
  glossario: '🤟',
  missoes: '🌎',
};

export async function loadModules(): Promise<ModuleCard[]> {
  if (!supabase) return localModules;

  const { data, error } = await supabase
    .from('modules')
    .select('slug,title,description,sort_order')
    .eq('published', true)
    .order('sort_order');

  if (error || !data?.length) return localModules;

  return data.map((row) => ({
    to: `/${row.slug}`,
    icon: iconBySlug[row.slug] ?? '🧪',
    title: row.title,
    description: row.description ?? '',
  }));
}

const localGlossary: GlossaryTerm[] = [
  { term: 'Átomo', definition: 'Unidade básica que compõe a matéria.', librasStatus: 'pending' },
  { term: 'Molécula', definition: 'Conjunto de dois ou mais átomos ligados.', librasStatus: 'pending' },
  { term: 'Reação química', definition: 'Transformação em que reagentes formam novas substâncias.', librasStatus: 'pending' },
  { term: 'Reagente', definition: 'Substância presente no início de uma reação.', librasStatus: 'pending' },
  { term: 'Produto', definition: 'Substância formada ao final de uma reação.', librasStatus: 'pending' },
  { term: 'Conservação da massa', definition: 'Em sistema fechado, a massa total é conservada durante a reação.', librasStatus: 'pending' },
];

export async function loadGlossary(): Promise<GlossaryTerm[]> {
  if (!supabase) return localGlossary;

  const { data, error } = await supabase
    .from('glossary_terms')
    .select('term_pt,definition_pt,example,category,libras_status,libras_video_path')
    .order('term_pt');

  if (error || !data?.length) return localGlossary;

  return data.map((row) => ({
    term: row.term_pt,
    definition: row.definition_pt,
    example: row.example,
    category: row.category,
    librasStatus: row.libras_status,
    librasVideoPath: row.libras_video_path,
  }));
}