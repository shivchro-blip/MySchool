import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand
  static const Color brand      = Color(0xFF2A7B6F); // teal (matches web English color)
  static const Color brandLight = Color(0xFFE6F4F2);
  static const Color brandDark  = Color(0xFF1d5c53);

  // Surface
  static const Color surface    = Color(0xFFF9FAFB);
  static const Color card       = Colors.white;

  // Text
  static const Color textPrimary   = Color(0xFF111827);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textMuted     = Color(0xFF9CA3AF);

  // UI
  static const Color border  = Color(0xFFE5E7EB);
  static const Color error   = Color(0xFFDC2626);
  static const Color warning = Color(0xFFD97706);
  static const Color success = Color(0xFF16A34A);

  // Subject color identity — matches web SUBJECT_PALETTE exactly
  static const Color english    = Color(0xFF2A7B6F);
  static const Color englishBg  = Color(0xFFE6F4F2);
  static const Color maths      = Color(0xFF5C6BC0);
  static const Color mathsBg    = Color(0xFFEEEFF9);
  static const Color science    = Color(0xFFD97020);
  static const Color scienceBg  = Color(0xFFFBEEE0);

  // Class level colors
  static const Color plus1      = Color(0xFF2EC4B6);
  static const Color plus1Bg    = Color(0xFFE7FAFA);
  static const Color plus2      = Color(0xFF9B72F0);
  static const Color plus2Bg    = Color(0xFFF0EBFE);

  // Utility: resolve subject name → color
  static Color subjectColor(String name) {
    final n = name.toLowerCase();
    if (n.contains('english'))   return english;
    if (n.contains('math'))      return maths;
    if (n.contains('science'))   return science;
    return const Color(0xFF6B7280);
  }

  static Color subjectBg(String name) {
    final n = name.toLowerCase();
    if (n.contains('english'))   return englishBg;
    if (n.contains('math'))      return mathsBg;
    if (n.contains('science'))   return scienceBg;
    return const Color(0xFFF3F4F6);
  }

  static ThemeData get light => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: brand,
      brightness: Brightness.light,
    ),
    textTheme: GoogleFonts.interTextTheme(),
    scaffoldBackgroundColor: surface,
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: textPrimary,
      elevation: 0,
      surfaceTintColor: Colors.transparent,
      centerTitle: false,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 18,
        fontWeight: FontWeight.w700,
        color: textPrimary,
      ),
    ),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Colors.white,
      selectedItemColor: brand,
      unselectedItemColor: Color(0xFF9CA3AF),
      type: BottomNavigationBarType.fixed,
      elevation: 8,
    ),
    cardTheme: CardThemeData(
      color: card,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: border),
      ),
      margin: EdgeInsets.zero,
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: brand, width: 2),
      ),
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: brand,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(48),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 15),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: textPrimary,
        minimumSize: const Size.fromHeight(48),
        side: const BorderSide(color: border),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: GoogleFonts.inter(fontWeight: FontWeight.w500, fontSize: 15),
      ),
    ),
  );
}
