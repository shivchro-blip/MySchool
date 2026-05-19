import 'package:flutter/material.dart';

class MarksChip extends StatelessWidget {
  final int marks;
  const MarksChip({super.key, required this.marks});

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = switch (marks) {
      1  => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
      2  => (const Color(0xFFDBEAFE), const Color(0xFF1D4ED8)),
      5  => (const Color(0xFFF3E8FF), const Color(0xFF7C3AED)),
      10 => (const Color(0xFFFEF3C7), const Color(0xFFB45309)),
      _  => (const Color(0xFFF3F4F6), const Color(0xFF374151)),
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
