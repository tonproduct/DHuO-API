"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Copy, Share2, MoreVertical, HelpCircle, Plus } from "lucide-react"

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: Math.round(width), height: Math.round(height) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, size }
}

export default function HeadersPage() {
  const [principalOpen, setPrincipalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const compactHeader = useElementSize<HTMLElement>()
  const imageHeader = useElementSize<HTMLImageElement>()

  return (
    <div className="min-h-screen bg-[#f4f4f5]" style={{ fontFamily: "Noto Sans, sans-serif" }}>
      <div className="px-10 py-14">
        <div className="max-w-[1450px] mx-auto flex flex-col gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">DHuO · Integra</span>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Header compacto</h1>
          <p className="text-[12px] font-mono text-gray-400 mb-3">
            {compactHeader.size.width} × {compactHeader.size.height} px
          </p>

          {/* ===== HEADER COMPACTO — 2 linhas ===== */}
          <header className="int-header" ref={compactHeader.ref}>
            {/* Linha 1 — identidade da integração */}
            <div className="int-header__row int-header__row--top">
              <div className="int-header__left">
                <div className="int-field">
                  <label className="int-field__label">Nome</label>
                  <span className="int-field__value">Integração de Faturamento e Cobrança SAP</span>
                </div>

                <div className="int-divider" />

                <div className="int-molecule">
                  <div className="int-field">
                    <label className="int-field__label">Principal</label>
                    <div className="ver-dropdown">
                      <button
                        className="ver-dropdown__btn"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={principalOpen}
                        onClick={() => setPrincipalOpen((v) => !v)}
                      >
                        v2 <span className="ver-dropdown__caret">▾</span>
                      </button>
                      {principalOpen && (
                        <div className="ver-dropdown__menu" role="menu">
                          <div className="ver-dropdown__item ver-dropdown__item--current" role="menuitem">
                            v2 <span>✓</span>
                          </div>
                          <div className="ver-dropdown__item" role="menuitem">v1</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="int-field">
                    <label className="int-field__label">Secundária</label>
                    <div className="ver-dropdown">
                      <button
                        className="ver-dropdown__btn"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen((v) => !v)}
                      >
                        v2.0.0 <span className="ver-dropdown__caret">▾</span>
                      </button>
                      {dropdownOpen && (
                        <div className="ver-dropdown__menu" role="menu">
                          <div className="ver-dropdown__item ver-dropdown__item--current" role="menuitem">
                            v2.0.0 <span>✓</span>
                          </div>
                          <div className="ver-dropdown__item" role="menuitem">v1.3.2</div>
                          <div className="ver-dropdown__item" role="menuitem">v1.3.1</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="int-new-version" type="button">
                    <Plus size={13} /> Nova versão
                  </button>
                </div>
              </div>

              <div className="int-header__meta">
                <span className="int-chip">Sem categoria</span>

                <span className="int-created">
                  Criado por <strong>Fernanda Bianchini</strong> em <strong>20/01/2026</strong>
                </span>
              </div>
            </div>

            <div className="int-header__sep" />

            {/* Linha 2 — busca e ações do canvas */}
            <div className="int-header__row int-header__row--actions">
              <div className="int-header__search-group">
                <div className="int-search">
                  <Search size={12} className="int-search__icon" />
                  <input type="text" placeholder="Buscar componentes no canvas" />
                </div>

                <label className="int-toggle">
                  <input
                    type="checkbox"
                    checked={advancedSearch}
                    onChange={(e) => setAdvancedSearch(e.target.checked)}
                  />
                  <span className="int-toggle__track" />
                  Busca Avançada <span title="Ajuda"><HelpCircle size={10} /></span>
                </label>
              </div>

              <div className="int-header__right">
                <button className="int-action">
                  <Copy size={12} /> Duplicar
                </button>
                <button className="int-action int-action--accent">
                  <Share2 size={12} /> Dependências
                </button>
                <button className="int-action int-action--icon">
                  <MoreVertical size={13} />
                </button>
                <button className="int-action int-action--icon">?</button>
              </div>
            </div>
          </header>

          <h1 className="text-[22px] font-bold text-gray-900 mt-10 mb-1">Header — anexo</h1>
          <p className="text-[12px] font-mono text-gray-400 mb-3">
            {imageHeader.size.width} × {imageHeader.size.height} px
          </p>

          {/* ===== HEADER — 1366x112 (imagem) ===== */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageHeader.ref}
            src="/headers/header-1366x112.png"
            alt="Header compacto do Integra — nome, versões, categoria, criado por, data de criação, busca e ações"
            width={1366}
            height={112}
            className="bh-image"
          />
        </div>
      </div>

      <style jsx>{`
        /* ===== Header compacto (2 linhas) ===== */
        .int-header {
          box-sizing: border-box;
          width: 1366px;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .int-header__row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          min-height: 24px;
        }

        .int-header__row--top,
        .int-header__row--actions {
          justify-content: space-between;
        }

        .int-header__sep {
          height: 1px;
          background: #f0f0f1;
        }

        .int-header__left,
        .int-header__meta,
        .int-header__right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .int-header__right {
          gap: 12px;
        }

        .int-molecule {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .int-header__search-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .int-field {
          display: flex;
          flex-direction: column;
          gap: 0;
          line-height: 1.1;
          white-space: nowrap;
        }

        .int-field__label {
          font-size: 9px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .int-field__value {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }

        .int-new-version {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          color: #14b8a6;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          white-space: nowrap;
        }

        .int-new-version:hover {
          color: #0f9488;
        }

        .int-divider {
          width: 1px;
          height: 18px;
          background: #e5e7eb;
        }

        .ver-dropdown {
          position: relative;
        }

        .ver-dropdown__btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #111827;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .ver-dropdown__caret {
          font-size: 10px;
          color: #9ca3af;
        }

        .ver-dropdown__menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 150px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 4px;
          z-index: 20;
        }

        .ver-dropdown__item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #374151;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
        }

        .ver-dropdown__item:hover {
          background: #f4f4f5;
        }

        .ver-dropdown__item--current {
          font-weight: 600;
          color: #14b8a6;
        }

        .ver-dropdown__item--new {
          color: #14b8a6;
          font-weight: 600;
          gap: 6px;
        }

        .ver-dropdown__plus {
          font-weight: 700;
        }

        .ver-dropdown__sep {
          height: 1px;
          background: #f0f0f1;
          margin: 4px 2px;
        }

        .int-chip {
          font-size: 10px;
          color: #6b7280;
          border: 1px solid #d1d5db;
          border-radius: 999px;
          padding: 2px 8px;
          white-space: nowrap;
        }

        .int-created {
          font-size: 11px;
          color: #9ca3af;
          white-space: nowrap;
        }

        .int-created strong {
          color: #374151;
          font-weight: 700;
        }

        .int-search {
          flex: 1;
          flex-shrink: 2;
          min-width: 90px;
          max-width: 280px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f4f4f5;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 4px 8px;
          transition: border-color 0.15s;
        }

        .int-search:focus-within {
          border-color: #14b8a6;
          background: #ffffff;
        }

        .int-search input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 12px;
          color: #111827;
        }

        .int-search input::placeholder {
          color: #9ca3af;
        }

        .int-search__icon {
          color: #9ca3af;
          flex-shrink: 0;
        }

        .int-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #6b7280;
          cursor: pointer;
          white-space: nowrap;
        }

        .int-toggle input {
          display: none;
        }

        .int-toggle__track {
          position: relative;
          width: 24px;
          height: 14px;
          border-radius: 999px;
          background: #d1d5db;
          transition: background 0.15s;
        }

        .int-toggle__track::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #ffffff;
          transition: transform 0.15s;
        }

        .int-toggle input:checked + .int-toggle__track {
          background: #14b8a6;
        }

        .int-toggle input:checked + .int-toggle__track::after {
          transform: translateX(10px);
        }

        .int-action {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
          background: none;
          border: none;
          padding: 2px 0;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s;
        }

        .int-action:hover {
          color: #111827;
        }

        .int-action--accent {
          color: #0f9488;
        }

        .int-action--accent:hover {
          color: #0d7d6f;
        }

        .int-action--icon {
          padding: 2px 4px;
        }

        /* ===== Header 1366x112 ===== */
        .bh-image {
          width: 1366px;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </div>
  )
}
