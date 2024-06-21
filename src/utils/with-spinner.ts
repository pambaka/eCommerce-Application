import Spinner from '../components/spinner-component';

export default async function withSpinner<T>(renderFunction: () => Promise<T>): Promise<T> {
  let spinner: HTMLElement | null = document.querySelector('.spinner-container');
  let spinnerTimeout: NodeJS.Timeout;

  if (!spinner) {
    spinner = new Spinner().node;
  }

  const showSpinner = () => {
    if (!document.querySelector('.spinner-container')) {
      document.body.appendChild(spinner!);
    }
  };

  try {
    spinnerTimeout = setTimeout(showSpinner, 300);

    const result = await renderFunction();

    clearTimeout(spinnerTimeout);

    return result;
  } finally {
    if (spinner && spinner.parentNode) {
      spinner.remove();
    }
  }
}
