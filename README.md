# ReAção Visual

Plataforma web bilíngue, visual e interativa para ensino de reações químicas a estudantes surdos.

## Stack
React + TypeScript + Vite, Supabase, Vercel, PostHog, Figma e Linear.

## Backend oficial
Projeto Supabase: `ReAção Visual`  
Região: São Paulo (`sa-east-1`)  
Project ref: `etynmcwfrfndesrpudmk`

## Desenvolvimento
1. Copie `.env.example` para `.env.local` e informe a chave publicável do Supabase.
2. `npm install`
3. `npm run dev`
4. `npm run build`

## Segurança
O frontend usa somente a chave publicável. Nunca use `service_role` ou `sb_secret_*` no cliente. As tabelas expostas usam RLS e grants mínimos.

## Libras
Não inventar sinais-termo. Os vídeos centrais devem ser validados por pessoas surdas/profissionais competentes antes de marcar `libras_status=validated`.