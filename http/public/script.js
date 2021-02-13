const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
  const { urls } = await fetch('http://localhost:3000/').then((res) =>
    res.json()
  );
  urls.forEach(addElement);
}

function createLink({ name, url }) {
  try {
    fetch(`http://localhost:3000/?name=${name}&url=${url}`);
  } catch (err) {
    throw new Error(err);
  }
}

function addElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const trash = document.createElement('span');

  a.href = url;
  a.innerHTML = name;
  a.target = '_blank';

  trash.innerHTML = 'x';
  trash.onclick = () => removeElement(trash);

  li.append(a);
  li.append(trash);
  ul.append(li);
}

function removeElement(el) {
  const $url = el.parentNode.querySelector('a'); 
  if (confirm('Tem certeza que deseja deletar?')) {
    const name = $url.textContent;
    const url = $url.getAttribute('href');

    fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`);
    el.parentNode.remove();
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let { value } = input;

  if (!value) return alert('Preencha o campo');

  const [name, url] = value.split(',');

  if (!url) return alert('formate o texto da maneira correta');

  if (!/^http/.test(url)) return alert('Digite a url da maneira correta');

  addElement({ name, url });
  createLink({ name, url });

  input.value = '';
});

load();
