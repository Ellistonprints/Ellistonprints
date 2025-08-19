
// Utility to get query param
function qp(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Fetch albums json
async function getAlbums(){
  const res = await fetch('data/albums.json');
  return await res.json();
}

// Render album cards
async function renderAlbumGrid(targetSelector, limit = null){
  const el = document.querySelector(targetSelector);
  if(!el) return;
  const albums = await getAlbums();
  const items = limit ? albums.slice(0, limit) : albums;
  el.innerHTML = items.map(a => `
    <a class="card album-card" href="gallery.html?album=${a.slug}">
      <img src="${a.cover}" alt="${a.title} cover">
      <div style="padding:8px 4px">
        <span class="tag">${a.category}</span>
        <h3>${a.title}</h3>
        <div class="meta">${a.images.length} photos</div>
      </div>
    </a>
  `).join('');
}

// Render a single gallery
async function renderGallery(){
  const slug = qp('album');
  if(!slug) return;
  const albums = await getAlbums();
  const album = albums.find(a=>a.slug===slug);
  if(!album) return;
  document.querySelector('#album-title').textContent = album.title;
  document.querySelector('#album-meta').textContent = `${album.category} • ${album.images.length} photos`;
  const g = document.querySelector('.gallery');
  g.innerHTML = album.images.map((src,idx)=>`<img src="${src}" data-idx="${idx}" alt="${album.title} ${idx+1}">`).join('');

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = lb.querySelector('img');
  let current = 0;
  function open(i){
    current = i;
    lbImg.src = album.images[i];
    lb.classList.add('open');
  }
  function close(){ lb.classList.remove('open'); }
  function prev(){ open((current-1+album.images.length)%album.images.length); }
  function next(){ open((current+1)%album.images.length); }

  g.addEventListener('click', e=>{
    if(e.target.tagName==='IMG'){ open(parseInt(e.target.dataset.idx,10)); }
  });
  lb.querySelector('.close').addEventListener('click', close);
  lb.querySelector('.prev').addEventListener('click', prev);
  lb.querySelector('.next').addEventListener('click', next);
  lb.addEventListener('click', (e)=>{ if(e.target===lb) close(); });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderAlbumGrid('#featured-grid', 4);
  renderAlbumGrid('#albums-grid', null);
  renderGallery();
});
