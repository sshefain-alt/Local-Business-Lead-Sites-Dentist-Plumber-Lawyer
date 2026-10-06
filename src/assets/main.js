/* TrustedLocal Pros — minimal site JS: nav, modal, form validation, accordion. */
(function () {
  'use strict';

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  /* ---------- modal ---------- */
  var modal = document.getElementById('lead-modal');
  var lastFocused = null;

  function openModal(serviceName) {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    if (serviceName) {
      var sel = modal.querySelector('select[name="service"]');
      if (sel) {
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === serviceName) { sel.selectedIndex = i; break; }
        }
      }
    }
    var first = modal.querySelector('input, select, textarea');
    if (first) first.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest ? e.target.closest('[data-open-modal]') : null;
    if (opener) {
      e.preventDefault();
      openModal(opener.getAttribute('data-service'));
      return;
    }
    if (e.target.closest && e.target.closest('[data-close-modal]')) {
      e.preventDefault();
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- form validation ---------- */
  var PHONE_RE = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function setError(input, message) {
    var box = document.querySelector('[data-error-for="' + input.id + '"]');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (box) { box.textContent = message; box.hidden = false; }
    } else {
      input.removeAttribute('aria-invalid');
      if (box) { box.textContent = ''; box.hidden = true; }
    }
  }

  function validate(form) {
    var ok = true;
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var email = form.querySelector('[name="email"]');

    if (name) {
      if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, 'Please enter your name.');
        ok = false;
      } else setError(name, '');
    }
    if (phone) {
      var digits = phone.value.trim();
      if (!digits) { setError(phone, 'Please enter your phone number.'); ok = false; }
      else if (!PHONE_RE.test(digits)) { setError(phone, 'Enter a valid 10-digit phone, e.g. (512) 555-0123.'); ok = false; }
      else setError(phone, '');
    }
    if (email && email.value.trim() && !EMAIL_RE.test(email.value.trim())) {
      setError(email, 'That email looks incomplete — or leave it blank.');
      ok = false;
    } else if (email) setError(email, '');

    if (!ok) {
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
    }
    return ok;
  }

  function showSuccess(form) {
    var wrap = form.closest('[data-form-wrap]');
    if (!wrap) return;
    var success = wrap.querySelector('[data-form-success]');
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('form.lead-form'), function (form) {
    // live re-validation after first attempt
    Array.prototype.forEach.call(form.querySelectorAll('[name="name"], [name="phone"], [name="email"]'), function (input) {
      input.addEventListener('blur', function () {
        if (input.hasAttribute('aria-invalid')) validate(form);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('[data-status]');
      if (!validate(form)) {
        if (status) { status.textContent = 'Please fix the highlighted fields.'; status.className = 'form-status is-error'; }
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      var endpoint = form.getAttribute('data-endpoint');
      if (btn) { btn.disabled = true; }
      if (status) { status.textContent = 'Sending…'; status.className = 'form-status'; }

      var payload = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.name) payload[el.name] = el.value;
      });
      payload.page = location.pathname;

      var finish = function () {
        if (btn) btn.disabled = false;
        if (status) status.textContent = '';
        showSuccess(form);
      };

      if (endpoint) {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (!res.ok) throw new Error('bad response');
            finish();
          })
          .catch(function () {
            if (btn) btn.disabled = false;
            if (status) {
              status.textContent = 'Something went wrong — please call us instead.';
              status.className = 'form-status is-error';
            }
          });
      } else {
        setTimeout(finish, 450);
      }
    });
  });

  // "Send another request" reset
  document.addEventListener('click', function (e) {
    var reset = e.target.closest ? e.target.closest('[data-form-reset]') : null;
    if (!reset) return;
    var wrap = reset.closest('[data-form-wrap]');
    if (!wrap) return;
    var form = wrap.querySelector('form');
    var success = wrap.querySelector('[data-form-success]');
    if (form) { form.reset(); form.hidden = false; }
    if (success) success.hidden = true;
    if (form) { var f = form.querySelector('input'); if (f) f.focus(); }
  });

  /* ---------- FAQ accordion: one open at a time per list ---------- */
  document.addEventListener(
    'toggle',
    function (e) {
      var details = e.target;
      if (!details.matches || !details.matches('details.faq-item') || !details.open) return;
      var list = details.parentElement;
      Array.prototype.forEach.call(list.querySelectorAll('details.faq-item[open]'), function (other) {
        if (other !== details) other.open = false;
      });
    },
    true
  );
})();
