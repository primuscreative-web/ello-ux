drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read"
on storage.objects for select
using (bucket_id = 'avatars');

drop policy if exists "avatars user write" on storage.objects;
create policy "avatars user write"
on storage.objects for all
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "portfolio public read" on storage.objects;
create policy "portfolio public read"
on storage.objects for select
using (bucket_id = 'portfolio');

drop policy if exists "portfolio professional write" on storage.objects;
create policy "portfolio professional write"
on storage.objects for all
using (
  bucket_id = 'portfolio'
  and exists (
    select 1
    from public.professional_profiles p
    where p.id::text = (storage.foldername(name))[1]
      and p.user_id = auth.uid()
  )
)
with check (
  bucket_id = 'portfolio'
  and exists (
    select 1
    from public.professional_profiles p
    where p.id::text = (storage.foldername(name))[1]
      and p.user_id = auth.uid()
  )
);

drop policy if exists "quote attachments participant read" on storage.objects;
create policy "quote attachments participant read"
on storage.objects for select
using (
  bucket_id = 'quote-attachments'
  and exists (
    select 1
    from public.quote_requests q
    left join public.client_profiles c on c.id = q.client_id
    left join public.professional_profiles p on p.id = q.professional_id
    where q.id::text = (storage.foldername(name))[1]
      and (c.user_id = auth.uid() or p.user_id = auth.uid())
  )
);

drop policy if exists "quote attachments participant write" on storage.objects;
create policy "quote attachments participant write"
on storage.objects for insert
with check (
  bucket_id = 'quote-attachments'
  and exists (
    select 1
    from public.quote_requests q
    left join public.client_profiles c on c.id = q.client_id
    left join public.professional_profiles p on p.id = q.professional_id
    where q.id::text = (storage.foldername(name))[1]
      and (c.user_id = auth.uid() or p.user_id = auth.uid())
  )
);
