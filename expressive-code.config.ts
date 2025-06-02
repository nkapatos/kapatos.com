import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export const expressiveCodeConfig = {
    plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    useDarkModeMediaQuery: false,
    themeCssSelector: (theme) => `[data-theme="${theme.name.split('-')[1]}"]`,
    defaultProps: {
      wrap: true,
      collapseStyle: 'collapsible-auto',
      overridesByLang: {
        'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
        {
          showLineNumbers: false,
        },
      },
    },
    styleOverrides: {
      codeFontSize: 'var(--text-font-small)',
      borderColor: 'var(--border)',
      codeFontFamily: 'var(--code-fonts)',
      codeBackground:
        'color-mix(in oklab, var(--surface-2) 25%, var(--charcoal-variation) 30%)',
      frames: {
        editorActiveTabForeground: 'var(--core-light)',
        editorActiveTabBackground:
          'color-mix(in oklab, var(--surface-1) 25%, transparent)',
        editorActiveTabIndicatorBottomColor: 'transparent',
        editorActiveTabIndicatorTopColor: 'transparent',
        editorTabBorderRadius: '0',
        editorTabBarBackground: 'transparent',
        editorTabBarBorderBottomColor: 'transparent',
        frameBoxShadowCssValue: 'none',
        terminalBackground:
          'color-mix(in oklab, var(--surface-1) 25%, transparent)',
        terminalTitlebarBackground: 'transparent',
        terminalTitlebarBorderBottomColor: 'transparent',
        terminalTitlebarForeground: 'var(--muted-foreground)',
      },
      lineNumbers: {
        foreground: 'var(--orange-variation)',
      },
      uiFontFamily: 'var(--font-sans)',
    },
  }