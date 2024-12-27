export default function getCurrentPosition(): number {
  const arrOfDivsWithImg = document.querySelectorAll('.small-image-wrapper');
  let position = 0;
  if (arrOfDivsWithImg) {
    arrOfDivsWithImg.forEach((item, index) => {
      if (item.classList.contains('current')) position = index;
    });
  }
  return position;
}
