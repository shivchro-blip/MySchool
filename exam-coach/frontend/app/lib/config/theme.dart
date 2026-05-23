import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // ── Brand ─────────────────────────────────────────────────────────────────
  static const Color brand           = Color(0xFF1D9E75);
  static const Color brandDeep       = Color(0xFF04342C);
  static const Color brandStrong     = Color(0xFF0F6E56);
  static const Color brandLight      = Color(0xFFE6F5EE);
  static const Color brandLightHover = Color(0xFFD0EDE3);
  static const Color brandDark       = Color(0xFF0F6E56);

  // ── Dark brand tokens ─────────────────────────────────────────────────────
  static const Color darkBrand       = Color(0xFF34C99A);
  static const Color darkBrandStrong = Color(0xFF5DCAA5);

  // ── Light surface tokens ──────────────────────────────────────────────────
  static const Color surface    = Color(0xFFFBFAF7);
  static const Color card       = Colors.white;

  // ── Light text tokens ─────────────────────────────────────────────────────
  static const Color textPrimary   = Color(0xFF111827);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textMuted     = Color(0xFF9CA3AF);

  // ── Light UI tokens ───────────────────────────────────────────────────────
  static const Color border     = Color(0xFFE5E7EB);
  static const Color borderSoft = Color(0xFFF0EEEC);
  static const Color error      = Color(0xFFDC2626);
  static const Color warning = Color(0xFFD97706);
  static const Color success = Color(0xFF16A34A);

  // ── Dark surface tokens ───────────────────────────────────────────────────
  static const Color darkSurface    = Color(0xFF0E1A16);
  static const Color darkCard       = Color(0xFF15241F);
  static const Color darkBorder          = Color(0xFF2A3D36);
  static const Color darkBorderSoft      = Color(0xFF1C302A);
  static const Color darkBrandLight      = Color(0xFF1C302A);
  static const Color darkBrandLightHover = Color(0xFF243D33);

  // ── Dark text tokens ──────────────────────────────────────────────────────
  static const Color darkText       = Color(0xFFF9FAFB);
  static const Color darkText2      = Color(0xFF9CA3AF);
  static const Color darkTextMuted  = Color(0xFF6B7280);

  // ── Dark semantic tokens ──────────────────────────────────────────────────
  static const Color darkErrorBg      = Color(0xFF2D1515);
  static const Color darkErrorBorder  = Color(0xFF5A2020);
  static const Color darkErrorFg      = Color(0xFFFCA5A5);
  static const Color darkSuccessBg    = Color(0xFF0D2818);
  static const Color darkSuccessBorder = Color(0xFF1F5C37);
  static const Color darkSuccessFg    = Color(0xFF86EFAC);
  static const Color darkWarningBg     = Color(0xFF2D1F00);
  static const Color darkWarningBorder = Color(0xFF78530A);
  static const Color darkWarningFg     = Color(0xFFFCD34D);

  // ── Subject / class colors (same in both modes) ───────────────────────────
  static const Color english    = Color(0xFF2A7B6F);
  static const Color englishBg  = Color(0xFFE6F4F2);
  static const Color maths      = Color(0xFF5C6BC0);
  static const Color mathsBg    = Color(0xFFEEEFF9);
  static const Color science    = Color(0xFFD97020);
  static const Color scienceBg  = Color(0xFFFBEEE0);

  static const Color plus1      = Color(0xFF2EC4B6);
  static const Color plus1Bg    = Color(0xFFE7FAFA);
  static const Color plus2      = Color(0xFF9B72F0);
  static const Color plus2Bg    = Color(0xFFF0EBFE);

  // ── Canonical radii ───────────────────────────────────────────────────────
  static const double radiusCard   = 12;
  static const double radiusButton = 10;
  static const double radiusInput  = 10;
  static const double radiusPill   = 9999;

  // ── Context-aware helpers ─────────────────────────────────────────────────
  static bool isDark(BuildContext ctx) =>
      Theme.of(ctx).brightness == Brightness.dark;

  static Color surfaceOf(BuildContext ctx) =>
      isDark(ctx) ? darkSurface : surface;
  static Color cardOf(BuildContext ctx) =>
      isDark(ctx) ? darkCard : card;
  static Color borderOf(BuildContext ctx) =>
      isDark(ctx) ? darkBorder : border;
  static Color textOf(BuildContext ctx) =>
      isDark(ctx) ? darkText : textPrimary;
  static Color text2Of(BuildContext ctx) =>
      isDark(ctx) ? darkText2 : textSecondary;
  static Color textMutedOf(BuildContext ctx) =>
      isDark(ctx) ? darkTextMuted : textMuted;
  static Color brandLightOf(BuildContext ctx) =>
      isDark(ctx) ? darkBrandLight : brandLight;
  static Color brandLightHoverOf(BuildContext ctx) =>
      isDark(ctx) ? darkBrandLightHover : brandLightHover;
  static Color borderSoftOf(BuildContext ctx) =>
      isDark(ctx) ? darkBorderSoft : borderSoft;

  static Color errorBgOf(BuildContext ctx) =>
      isDark(ctx) ? darkErrorBg : const Color(0xFFFEF2F2);
  static Color errorBorderOf(BuildContext ctx) =>
      isDark(ctx) ? darkErrorBorder : const Color(0xFFFECACA);
  static Color errorFgOf(BuildContext ctx) =>
      isDark(ctx) ? darkErrorFg : const Color(0xFFB91C1C);

  static Color successBgOf(BuildContext ctx) =>
      isDark(ctx) ? darkSuccessBg : const Color(0xFFF0FDF4);
  static Color successBorderOf(BuildContext ctx) =>
      isDark(ctx) ? darkSuccessBorder : const Color(0xFFBBF7D0);
  static Color successFgOf(BuildContext ctx) =>
      isDark(ctx) ? darkSuccessFg : const Color(0xFF15803D);

  static Color warningBgOf(BuildContext ctx) =>
      isDark(ctx) ? darkWarningBg : const Color(0xFFFFFBEB);
  static Color warningBorderOf(BuildContext ctx) =>
      isDark(ctx) ? darkWarningBorder : const Color(0xFFFDE68A);
  static Color warningFgOf(BuildContext ctx) =>
      isDark(ctx) ? darkWarningFg : const Color(0xFF92400E);

  // ── Subject helpers (unchanged) ───────────────────────────────────────────
  static Color subjectColor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return english;
    if (n.contains('math'))    return maths;
    if (n.contains('science')) return science;
    return const Color(0xFF6B7280);
  }

  static Color subjectBg(String name) {
    final n = name.toLowerCase();
    if (n.contains('english')) return englishBg;
    if (n.contains('math'))    return mathsBg;
    if (n.contains('science')) return scienceBg;
    return const Color(0xFFF3F4F6);
  }

  // ── Text styles ───────────────────────────────────────────────────────────
  static TextStyle eyebrowStyle(BuildContext ctx) =>
    GoogleFonts.inter(
      fontSize:      11,
      fontWeight:    FontWeight.w600,
      letterSpacing: 0.8,
      height:        1.2,
      color:         textMutedOf(ctx),
    );

  static TextStyle pageTitleStyle(BuildContext ctx) =>
    GoogleFonts.inter(
      fontSize:      24,
      fontWeight:    FontWeight.w700,
      height:        1.2,
      letterSpacing: -0.3,
      color:         textOf(ctx),
    );

  // ── ThemeData ─────────────────────────────────────────────────────────────
  static ThemeData get light => _buildTheme(
    brightness:       Brightness.light,
    scaffoldBg:       surface,
    cardColor:        card,
    borderColor:      border,
    textColor:        textPrimary,
    overlayStyle:     SystemUiOverlayStyle.light,
    fillColor:        Colors.white,
    inputBorderColor: border,
    bottomNavBg:      Colors.white,
    appBarBg:         brandDeep,
    appBarFg:         Colors.white,
    unselectedNavColor: textMuted,
  );

  static ThemeData get dark => _buildTheme(
    brightness:       Brightness.dark,
    scaffoldBg:       darkSurface,
    cardColor:        darkCard,
    borderColor:      darkBorder,
    textColor:        darkText,
    overlayStyle:     SystemUiOverlayStyle.light,
    fillColor:        darkCard,
    inputBorderColor: darkBorder,
    bottomNavBg:      darkCard,
    appBarBg:         brandDeep,
    appBarFg:         Colors.white,
    unselectedNavColor: darkTextMuted,
  );

  static ThemeData _buildTheme({
    required Brightness brightness,
    required Color scaffoldBg,
    required Color cardColor,
    required Color borderColor,
    required Color textColor,
    required SystemUiOverlayStyle overlayStyle,
    required Color fillColor,
    required Color inputBorderColor,
    required Color bottomNavBg,
    required Color appBarBg,
    required Color appBarFg,
    required Color unselectedNavColor,
  }) {
    return ThemeData(
      useMaterial3:           true,
      brightness:             brightness,
      colorScheme: ColorScheme.fromSeed(
        seedColor:  brand,
        brightness: brightness,
      ),
      textTheme: GoogleFonts.interTextTheme().apply(
        bodyColor:    textColor,
        displayColor: textColor,
      ),
      scaffoldBackgroundColor: scaffoldBg,
      appBarTheme: AppBarTheme(
        backgroundColor:    appBarBg,
        foregroundColor:    appBarFg,
        elevation:          0,
        surfaceTintColor:   Colors.transparent,
        centerTitle:        false,
        systemOverlayStyle: overlayStyle,
        titleTextStyle: GoogleFonts.inter(
          fontSize:   18,
          fontWeight: FontWeight.w700,
          color:      appBarFg,
        ),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor:     bottomNavBg,
        selectedItemColor:   brand,
        unselectedItemColor: unselectedNavColor,
        type:                BottomNavigationBarType.fixed,
        elevation:           8,
      ),
      cardTheme: CardThemeData(
        color:     cardColor,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppTheme.radiusCard),
          side: BorderSide(color: borderColor),
        ),
        margin: EdgeInsets.zero,
      ),
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppTheme.radiusInput),
          borderSide: BorderSide(color: inputBorderColor),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppTheme.radiusInput),
          borderSide: BorderSide(color: inputBorderColor),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppTheme.radiusInput),
          borderSide: const BorderSide(color: brand, width: 2),
        ),
        filled:         true,
        fillColor:      fillColor,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: brand,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(48),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
          textStyle: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 15),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: textColor,
          minimumSize: const Size.fromHeight(48),
          side: BorderSide(color: borderColor),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppTheme.radiusButton)),
          textStyle: GoogleFonts.inter(fontWeight: FontWeight.w500, fontSize: 15),
        ),
      ),
    );
  }
}
