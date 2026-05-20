import 'package:flutter/material.dart';
import '../config/theme.dart';

class MarksChip extends StatelessWidget {
  final int marks;
  const MarksChip({super.key, required this.marks});

  @override
  Widget build(BuildContext context) {
    final dark = AppTheme.isDark(context);
    final (bg, fg) = switch (marks) {
      1  => dark
          ? (const Color(0xFF1F2937), const Color(0xFFD1D5DB))
          : (const Color(0xFFF3F4F6), const Color(0xFF374151)),
      2  => dark
          ? (const Color(0xFF1E3A5F), const Color(0xFF93C5FD))
          : (const Color(0xFFDBEAFE), const Color(0xFF1D4ED8)),
      5  => dark
          ? (const Color(0xFF2E1F4F), const Color(0xFFC4B5FD))
          : (const Color(0xFFF3E8FF), const Color(0xFF7C3AED)),
      10 => dark
          ? (const Color(0xFF3B2800), const Color(0xFFFCD34D))
          : (const Color(0xFFFEF3C7), const Color(0xFFB45309)),
      _  => dark
          ? (const Color(0xFF1F2937), const Color(0xFFD1D5DB))
          : (const Color(0xFFF3F4F6), const Color(0xFF374151)),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color:        bg,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        '$marks ${marks == 1 ? 'mark' : 'marks'}',
        style: TextStyle(
          fontSize:   12,
          fontWeight: FontWeight.w600,
          color:      fg,
        ),
      ),
    );
  }
}
