let isDarkMode = false;

function addButtons(codeBlock) {
  if (codeBlock.dataset.buttonsAdded) return;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'code-buttons';

  const previewBtn = createButton('Preview Code', () => togglePreview(codeBlock.textContent), 'preview-btn');

  buttonsDiv.append(previewBtn);
  codeBlock.parentNode.insertBefore(buttonsDiv, codeBlock.nextSibling);
  codeBlock.dataset.buttonsAdded = 'true';
}


function createButton(text, onClick, className = '') {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.addEventListener('click', onClick);
  if (className) button.className = className;
  return button;
}

function togglePreview(code) {
  let previewContainer = document.getElementById('code-preview-container');

  if (previewContainer) {
    previewContainer.remove();
    document.body.style.width = '100%';
    return;
  }

  previewContainer = document.createElement('div');
  previewContainer.id = 'code-preview-container';

  const previewContent = document.createElement('iframe');
  previewContent.id = 'code-preview-content';

  const codeContent = document.createElement('pre');
  codeContent.id = 'code-preview-code';
  codeContent.textContent = code;
  codeContent.style.display = 'none';

  const topControlsDiv = document.createElement('div');
  topControlsDiv.className = 'preview-controls top';

  const closeBtn = createButton(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 6L6 18M6 6l12 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`, () => {
    previewContainer.remove();
    document.body.style.width = '100%';
  }, 'close-btn');
  closeBtn.title = 'Close';

  const copyBtn = createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>', () => copyCode(code), 'copy-btn');
  copyBtn.title = 'Copy';

  const downloadBtn = createButton('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a1 1 0 0 1 1 1v10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1zM5 17a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" /></svg>', () => downloadCode(code), 'download-btn');
  downloadBtn.title = 'Download';

  const reloadBtn = createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.1-.22 2.14-.61 3.09l1.46 1.46C19.78 14.9 20 13.48 20 12c0-4.42-3.58-8-8-8zm-6.39 1.91L4.22 4.22C2.78 5.66 2 7.71 2 10c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6 0-1.1.22-2.14.61-3.09z"/></svg>', () => {
    previewContainer.remove();
    togglePreview(code);
    pauseExecutionUntilClick(previewContainer);
  }, 'reload-btn');
  reloadBtn.title = 'Reload';

  const darkModeToggle = createButton(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 10.45l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM4.22 19.78l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>`, toggleDarkMode, 'dark-mode-toggle');
  darkModeToggle.title = 'Toggle Dark Mode';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'preview-title';
  titleDiv.innerHTML = '<a href="https://github.com/SayfullahSayeb/ChatGPT-Code-Preview/" target="_blank" title="Visit GitHub"><svg width="32px" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.64 3.64 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2 2 0 0 1 1.538 1.025 2.137 2.137 0 0 0 2.912.825 2.1 2.1 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.9 3.9 0 0 1 1.025-2.688 3.6 3.6 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.43 9.43 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.6 3.6 0 0 1 .1 2.65 3.87 3.87 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.562 4.937a2.37 2.37 0 0 1 .674 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247"/></svg>Preview Code</a> ';

  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'preview-tabs';

  const previewTab = createButton('Preview', () => {
    previewContent.style.display = 'block';
    codeContent.style.display = 'none';
    previewTab.classList.add('active');
    codeTab.classList.remove('active');
  }, 'tab-btn active');

  const codeTab = createButton('Code', () => {
    previewContent.style.display = 'none';
    codeContent.style.display = 'block';
    previewTab.classList.remove('active');
    codeTab.classList.add('active');
  }, 'tab-btn');

  tabsDiv.append(previewTab, codeTab, copyBtn, downloadBtn, reloadBtn);

  topControlsDiv.append(titleDiv, tabsDiv);
  const rightControls = document.createElement('div');
  rightControls.className = 'right-controls';
  rightControls.append(darkModeToggle, closeBtn);
  topControlsDiv.append(rightControls);
  previewContainer.append(topControlsDiv, previewContent, codeContent);
  document.body.appendChild(previewContainer);

  // Resize main content
  document.body.style.width = '40%';

  updatePreview(code);
  makeResizable(previewContainer);
  applyDarkMode();
}

function pauseExecutionUntilClick(element) {
  function resumeExecution() {
    element.removeEventListener('click', resumeExecution);
    // Resume any paused execution here
  }

  element.addEventListener('click', resumeExecution);
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  applyDarkMode();
}

function applyDarkMode() {
  const previewContainer = document.getElementById('code-preview-container');
  if (previewContainer) {
    previewContainer.classList.toggle('dark-mode', isDarkMode);
    const darkModeToggle = previewContainer.querySelector('.dark-mode-toggle');
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
  }
}

function updatePreview(code) {
  const previewContent = document.getElementById('code-preview-content');
  previewContent.srcdoc = code;
}

function makeResizable(element) {
  const resizer = document.createElement('div');
  resizer.className = 'resizer';
  element.appendChild(resizer);

  let startX, startWidth;

  function startResize(e) {
    startX = e.clientX;
    startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
    document.documentElement.addEventListener('mousemove', resize);
    document.documentElement.addEventListener('mouseup', stopResize);
  }

  function resize(e) {
    const width = startWidth - (e.clientX - startX);
    const mainContentWidth = 100 - (width / window.innerWidth * 100);
    element.style.width = width + 'px';
    document.body.style.width = mainContentWidth + '%';
  }

  function stopResize() {
    document.documentElement.removeEventListener('mousemove', resize);
    document.documentElement.removeEventListener('mouseup', stopResize);
  }

  resizer.addEventListener('mousedown', startResize);
}

function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 1500);
  });
}

function downloadCode(code) {
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.txt';
  a.click();
  URL.revokeObjectURL(url);

  const downloadBtn = document.querySelector('.download-btn');
  downloadBtn.classList.add('downloaded');
  setTimeout(() => downloadBtn.classList.remove('downloaded'), 1500);
}

function addButtonsToExistingCodeBlocks() {
  document.querySelectorAll('pre').forEach(preElement => {
    const codeElement = preElement.querySelector('code');
    checkAndAddButton(preElement, codeElement)
  });

}

// Initial run
addButtonsToExistingCodeBlocks();

function checkAndAddButton(preElement, codeElement) {
  if (!codeElement) return; // Early return if codeElement is not provided

  // Check for presence of 'sh' or 'bash' in the span elements
  const isShellOrBashPresent = Array.from(preElement.querySelectorAll('span'))
    .some(span => ['sh', 'bash'].includes(span.textContent.trim()));

  // Add buttons if neither 'sh' nor 'bash' is found
  if (!isShellOrBashPresent) {
    addButtons(codeElement);
  }
}


// Set up a MutationObserver to watch for new code blocks
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.querySelectorAll('pre').forEach(preElement => {
            const codeElement = preElement.querySelector('code');
            checkAndAddButton(preElement, codeElement)
          });

        }
      });
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Periodically check for new code blocks (as a fallback)
setInterval(addButtonsToExistingCodeBlocks, 2000);
